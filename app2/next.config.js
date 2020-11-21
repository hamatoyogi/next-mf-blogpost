const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const path = require('path');

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: 'app2',
      library: { type: config.output.libraryTarget, name: 'app2' },
      filename: 'static/runtime/remoteEntry.js',
      // this is where we define what and where we're going to consume our modules.
      // note that this is only for local development and is relative to where the remote
      // app is in you folder structure.
      remotes: {
        // this defines our remote app name space, so we will be able to
        // import from 'app1'
        app1: isServer
          ? path.resolve(
              __dirname,
              '../app1/.next/server/static/runtime/remoteEntry.js'
            )
          : 'app1', // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3001/_next/';
    }

    return config;
  },
};
