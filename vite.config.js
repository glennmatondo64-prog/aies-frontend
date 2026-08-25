import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server runs on port 3000 to match the backend's CLIENT_URL
// (CORS allowlist), so the two connect with no extra configuration.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
