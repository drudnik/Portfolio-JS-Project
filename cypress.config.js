const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  retries: 2,
  env: {
    //Цвета стенда
    colorBlueSolid: 'rgb(47, 84, 235)',
    colorBlueGradient: 'linear-gradient(251.59deg, rgb(47, 84, 235) 0%, rgb(14, 131, 223) 99.45%)',
    colorRed: 'rgb(68, 68, 68)'
  },
  e2e: {
    viewportWidth: "1920",
    viewportHeight: "1080",
    baseUrl: "https://___________/",
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'cypress/e2e/**/**/*.{js,jsx,ts,tsx}',
    retries: 0,
    video: false,
    defaultCommandTimeout: 60000,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});