/*
 * I2FAS Service Abstraction
 */

var implementationModule = require('../../config').backend_services.i2fas.module;
console.log('STS implementationModule', implementationModule);
var service = require('./' + implementationModule);
var libUtils = require('../lib/utils');
var constants = require('../lib/constants');

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
      };
    } else {
      userData = {
        type: authData.type === 'SOFTWARE' ? 
          'google_auth' : 'unknown',
        is2fa: true,
        isFullyLoggedIn: false,
        authData: authData
      };
    }

    callback(null, userData);
  });
}

function getSoftAuthData(seccurityContext, callback) {
  var result;
  service.softAuthData(seccurityContext, constants.i2fasService.POST_PAYLOAD, function(err, activationData) {
    if(err) {
      return callback(err);
    }
    
    if(libUtils.isObjectEmpty(activationData)) {
      result = {
        error: 'Invalid session token'        
      }
    } else {
      result = {
        activationData: activationData
      };
      result.activationData.type = 'google_auth';      
    }
     
    callback(null, result);  
  });
}

function activateDevice(securityContext, payload, callback) {
  var result;
  service.activate(securityContext, payload, function(err, response) {
    if(err) {
      return callback(err);
    }

    if(libUtils.isObjectEmpty(response)) {
      result = {
        error: 'Service failure'
      };
    } else if(response.result === 'activation_success') {
      result = {
        userData: {
          type: 'google_auth',
          is2fa: true,
          isFullyLoggedIn: true
        }        
      };  
    } else {
      result = {
        error: 'Invalid OTP Code'
      };
    }

    callback(null, result);
  });
}

function autheticateUser(securityContext, payload, callback) {
  var result;
  service.autheticate(securityContext, payload, function(err, response) {
    if(err) {
      return callback(err);
    }
    
    if(libUtils.isObjectEmpty(response)) {
      result = {
        error: 'Service failure'
      };
    } else if(response.result === '2fa_login_success') {
      result = {
        userData: {
          type: 'google_auth',
          is2fa: true,
          isFullyLoggedIn: true
        }        
      }
    } else {
      result = {
        error: 'Invalid OTP Code'
      };      
    }

    callback(null, result);
  });
}

module.exports = {
	getAuthenticatorType: getAuthenticatorType,
  getSoftAuthData: getSoftAuthData,
  activateDevice: activateDevice,
  autheticateUser: autheticateUser
};