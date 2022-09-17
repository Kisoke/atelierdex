// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss:{
      postcssOptions:{
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  
  vite: {
    server: {
      watch: {
        usePolling: true, 
      },
    },
  },

  css: [
    '@/assets/css/main.css',
  ],
})
