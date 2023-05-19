const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'shell',
  remotes: ['home', 'settings', 'profile', 'auth'],
};
