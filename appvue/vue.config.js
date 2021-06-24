const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  publicPath: 'http://localhost:8080/',
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "appvue",
        filename: "remoteEntry.js",
        exposes: {
          "./HelloText": "./src/components/HelloText.vue",
          './appVue': require.resolve('vue'),
        },
        shared: {
          vue: {
            import: 'vue',
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    ],
  },
};
