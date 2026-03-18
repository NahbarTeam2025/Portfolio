console.log('main.tsx loading...');
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log('main.tsx imports complete');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);
  if (!rootElement) throw new Error('Failed to find the root element');

  const root = createRoot(rootElement);
  console.log('Root created, rendering...');
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
  console.log('Render call complete');
} catch (e) {
  console.error('Startup Error caught in main.tsx:', e);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: #ff4444; background: #111; min-height: 100vh; font-family: monospace;">
      <h2 style="margin-bottom: 10px;">Startup Error</h2>
      <pre style="white-space: pre-wrap; word-break: break-all;">${e instanceof Error ? e.stack || e.message : String(e)}</pre>
    </div>`;
  }
}
