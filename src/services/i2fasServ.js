/*
 * I2FAS Service Abstraction
 */

var implementationModule = require('../../config').backend_services.i2fas.module;
console.log('STS implementationModule', implementationModule);
var service = require('./' + implementationModule);
var libUtils = require('../lib/utils');

function getAuthenticatorType(seccurityContext, callback) {
  var userData;
  service.authenticatorType(seccurityContext, function(err, authData) {
    if(err) {
      return callback(err);
    }

    if(libUtils.isObjectEmpty(authData)) {
      userData = {
        type: 'basic',
        is2fa: false,
        isFullyLoggedIn: true
      }
    } else {
      userData = {
        type: authData.type === 'SOFTWARE' ? 
          'google_auth' : 'unknown',
        is2fa: true,
        isFullyLoggedIn: false,
        authData: authData
      }
    }

    callback(null, userData);
  })
}

module.exports = {
	getAuthenticatorType: getAuthenticatorType
};