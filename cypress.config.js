const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://rotogrinders.com/sign-up',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      
    },
  },
});
