import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Red de seguridad global: ningún error de render deja la página en blanco. */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
