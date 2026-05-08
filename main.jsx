import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './src/App.jsx';
import './src/index.css';

console.log('ArcadeHub: Bootstrapping application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('ArcadeHub Error: Root element not found!');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('ArcadeHub: Rendered successfully');
  } catch (err) {
    console.error('ArcadeHub Runtime Error:', err);
    rootElement.innerHTML = `<div style="padding: 20px; color: white;"><h1>Runtime Error</h1><pre>${err.stack}</pre></div>`;
  }
}
