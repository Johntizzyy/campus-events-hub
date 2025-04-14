import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    // Add CSP-compliant script loading
    jsxRuntime: 'classic',
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
      ]
    }
  })],
  server: {
    port: 5173,
    open: true,
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
    }
  },
  base: '/campus-events-hub/',
}); 