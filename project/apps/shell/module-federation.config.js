const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'shell',
  remotes: ['home', 'profile', 'auth', 'single-event', 'create-event'],
};
