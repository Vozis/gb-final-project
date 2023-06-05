const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'single-event',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
