const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "app1",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./nav": "./components/nav",
    "./add": "./utils/add",
    "./multiplyByTwo": "./utils/multiplyByTwo",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack(config, options) {
    if (!options.isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
    }

    return config;
  }
});
