const { defineConfig } = require("cypress");
const axios = require('axios');

module.exports = defineConfig({
   e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 6000,
    retries: { runMode: 2, openMode: 0 },
    setupNodeEvents(on, config) {
      on("task", {
    async "db:seed"() {
        const { data } = await axios.post('http://localhost:3001/testData/seed');
        return data;
    }
})
    },
  },
});
