import { defineConfig } from "cypress";

export default defineConfig({
  watchForFileChanges: false,
  chromeWebSecurity: false,
  experimentalWebKitSupport: true,
  screenshotsFolder: "cypress/results",
  viewportHeight: 1500,
  viewportWidth: 1800,
  e2e: {
    baseUrl: "https://coding.pasv.us",
    env: {
      devtools: true,
    },
    setupNodeEvents(on, config) {
      config.defaultCommandTimeout = 4000;
      config.requestTimeout = 5000;
      config.responseTimeout = 5000;

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      let savedData = {};

      on("task", {
        save(data) {
          savedData = { ...savedData, ...data };
          return null;
        },
        load() {
          return savedData || null;
        },
      });

      on("before:browser:launch", (browser: Cypress.Browser, launchOptions) => {
        if (config.env?.devtools) {
          // `args` is an array of all the arguments that will
          // be passed to browsers when it launches
          if (browser.family === "chromium" && browser.name !== "electron") {
            // auto open devtools
            // Chrome is used by default for `cypress open`
            // Electron is used for `cypress run` but the command line flags are modified by ELECTRON_EXTRA_LAUNCH_ARGS environment variable
            launchOptions.args.push("--auto-open-devtools-for-tabs");
          }

          if (browser.family === "firefox") {
            // auto open devtools
            launchOptions.args.push("-devtools");
          }

          if (browser.name === "electron") {
            // auto open devtools
            launchOptions.preferences.devTools = true;
          }
        }

        // whatever you return here becomes the launchOptions
        return launchOptions;
      });
      // IMPORTANT return the updated config object
      return config;
    },
  },
});
