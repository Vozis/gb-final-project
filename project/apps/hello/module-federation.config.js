const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'hello',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
