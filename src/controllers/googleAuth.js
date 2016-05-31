/*
 * googleAuth Controller
 */

var i2faServ = require('../services/i2fasServ');
var libUtils = require('../lib/utils');
var constants = require('../lib/constants');

function getAuthenticationMethod(req, res, next) {
  i2faServ.getAuthenticatorType(req.securityContext, function(err, userData) {
    // uncomment to test error case
    // err = new Error('HARD CODED ERROR');
    // err.someProp = 'fakeValue';
    if(err) {
      return next(err);
    }

    if(!userData) {
      errorObj = new Error('Empty User Data');
      errorObj.status = 401;
      next(errorObj);
    }

    res.status(200);
    res.json({
      userData: userData
    });
  })
}

function getSoftAuthData(req, res, next) {
  i2faServ.getSoftAuthData(req.securityContext, function(err, activationData) {
    if(err) {
      return next(err);
    }

    if(!activationData) {
      errorObj = new Error('Empty Activation Data');
      errorObj.status = 401;
      next(errorObj);
    }
    
    // set secret and nonce in cookies
    res.cookie(constants.GOOGLE_AUTH_NONCE_COOKIE_NAME, activationData.activationData.nonce);
    res.cookie(constants.GOOGLE_AUTH_SECRET_COOKIE_NAME, activationData.activationData.secret);

    res.status(200);
    res.json(activationData);
  })
}

function activateDevice(req, res, next) {
  // nonce and secret are in the cookies
  var payload = {
    nonce: libUtils.getGoogleAuthNonceCookieValue(req),
    secret: libUtils.getGoogleAuthSecretCookieValue(req),
    challenge: req.body.otp
  }
  i2faServ.activateDevice(req.securityContext, payload, function(err, userData) {
    if(err) {
      return next(err);
    }

    if(!userData) {
      errorObj = new Error('Empty User Data');
      errorObj.status = 401;
      next(errorObj);
    }

    res.status(200);
    res.json(userData);
  })  
}

module.exports = {
  getAuthenticationMethod: getAuthenticationMethod,
  getSoftAuthData: getSoftAuthData,
  activateDevice: activateDevice
}