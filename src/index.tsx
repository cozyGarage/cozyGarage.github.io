import { createRoot } from 'react-dom/client';
import { App } from './app/App';
// @ts-expect-error - registerServiceWorker is not typed
import registerServiceWorker from './registerServiceWorker';
import { features, isDebugMode } from './shared/config/features';

// Log feature flags on startup (development only)
if (isDebugMode()) {
  console.info('🚩 Feature Flags:', features);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = createRoot(rootElement);
root.render(<App />);
registerServiceWorker();
