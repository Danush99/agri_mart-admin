const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '39g3c1',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
