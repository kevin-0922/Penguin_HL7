const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react-swc');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    open: true
  }
})
