import { createRoot } from 'react-dom/client';
import { App } from './app/App';
// @ts-ignore
import registerServiceWorker from './registerServiceWorker';
import { features, isDebugMode } from './shared/config/features';
import { initAnalytics } from './shared/utils/analytics';

// Log feature flags on startup (development only)
if (isDebugMode()) {
  console.info('🚩 Feature Flags:', features);
}

// Initialize analytics
initAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = createRoot(rootElement);
root.render(<App />);
registerServiceWorker();
