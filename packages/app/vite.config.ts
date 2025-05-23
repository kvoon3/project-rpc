import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __buildTime__: JSON.stringify(Date.now()),
  },
})
