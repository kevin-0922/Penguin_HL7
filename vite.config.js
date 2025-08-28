const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react-swc');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
