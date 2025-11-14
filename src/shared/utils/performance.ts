/**
 * Performance Monitoring Utilities
 * Provides tools for measuring and tracking web performance metrics
 */

/**
 * Measure component render time (for development)
 */
export const measureRender = (componentName: string, callback: () => void) => {
  if (process.env.NODE_ENV !== 'production') {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
  } else {
    callback();
  }
};

/**
 * Report Web Vitals to analytics
 * Core Web Vitals: LCP, FID, CLS
 * Note: Requires 'web-vitals' package to be installed
 */
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals if available
    import('web-vitals' as any).then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // web-vitals not installed, silently fail
    });
  }
};

/**
 * Simple performance profiler for expensive operations
 */
export class PerformanceProfiler {
  private static marks: Map<string, number> = new Map();

  static start(label: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.marks.set(label, performance.now());
    }
  }

  static end(label: string, logResult = true) {
    if (process.env.NODE_ENV !== 'production') {
      const start = this.marks.get(label);
      if (start !== undefined) {
        const duration = performance.now() - start;
        if (logResult) {
          console.log(`[Profiler] ${label}: ${duration.toFixed(2)}ms`);
        }
        this.marks.delete(label);
        return duration;
      }
    }
    return 0;
  }
}

/**
 * Debounce function to limit execution frequency
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function to limit execution rate
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
