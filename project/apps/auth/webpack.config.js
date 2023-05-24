const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const withModuleFederation = require('@nx/react/module-federation');
const { merge } = require('webpack-merge');

const moduleFederationConfig = require('./module-federation.config');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const baseConfig = require('./module-federation.config');

const federationModuleConfig = {
  ...baseConfig,
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  withNx(),
  withReact(),
  async (config, { options, context }) => {
    config.plugins.push(new NodePolyfillPlugin());

    const federatedModules = await withModuleFederation({
      ...federationModuleConfig,
    });

    return merge(federatedModules(config, { options, context }), {
      // resolve: {
      //   fallback: {
      //     fs: false,
      //     path: false,
      //     os: false,
      //     crypto: false,
      //     stream: false,
      //   },
      // },
    });
  },
  // (config, { options, context }) => {
  //   config.plugins.push(new NodePolyfillPlugin());
  //   return config;
  // },
  // withModuleFederation(config),
);

// module.exports = composePlugins(
//   withNx(),
//   async (config, { options, context }) => {
//     const federatedModules = await withModuleFederation({
//       // your options here
//     });
//
//     return merge(federatedModules(config, { options, context }), {
//       // overwrite values here
//     });
//   },
// );
