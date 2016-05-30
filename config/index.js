/*
 * Defines configuration according to environment
 */

var environment = process.env.NODE_ENV || 'development';

var envConfigModule = environment === 'test' ?
  'test' : 'development';
  
var defaultConfig = require('./files/default');
var envConfig = require('./files/' + envConfigModule);

// merge default config and selected config
var configuration = Object.assign({}, defaultConfig, envConfig);

console.log('configuration loaded:', JSON.stringify(configuration));

module.exports = configuration;