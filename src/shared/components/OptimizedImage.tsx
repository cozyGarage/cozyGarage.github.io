import React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string; // original path (e.g. /projects/othello.png)
  alt: string;
  sizes?: string; // optional sizes attribute
  className?: string;
}

/**
 * OptimizedImage
 * Renders a <picture> element using generated AVIF and WebP variants if available.
 * It assumes the optimizer outputs files under /optimized/<same-dir>/<name>-<width>.<format>
 * Fallback: uses the provided src directly.
 */
export const OptimizedImage: React.FC<Props> = ({ src, alt, sizes = '(max-width: 800px) 100vw, 800px', className, ...rest }) => {
  // Derive paths
  const parsed = src.split('/');
  const filename = parsed.pop() || '';
  const dir = parsed.join('/'); // e.g., /projects
  const name = filename.replace(/\.[^.]+$/, '');

  const widths = [400, 800, 1200];

  // Build srcSet pointing to /optimized/<dir>/<name>-<width>.<fmt>
  const makeSrcSet = (fmt: string) => widths.map(w => `/optimized${dir}/${name}-${w}.${fmt} ${w}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={makeSrcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={makeSrcSet('webp')} sizes={sizes} />
      <img src={src} alt={alt} className={className} loading="lazy" {...rest} />
    </picture>
  );
};

export default OptimizedImage;
