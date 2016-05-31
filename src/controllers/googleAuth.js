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
    
    // set secret in cookies
    if (userData.authData) {
      res.cookie(constants.GOOGLE_AUTH_SECRET_COOKIE_NAME, userData.authData.secret);
    }    

    res.status(200);
    res.json({
      userData: userData
    });
  })
}

function getSoftAuthData(req, res, next) {
  i2faServ.getSoftAuthData(req.securityContext, function(err, data) {
    if(err) {
      return next(err);
    }

    if(!data) {
      errorObj = new Error('Empty Activation Data');
      errorObj.status = 401;
      next(errorObj);
    }
    
    // set secret and nonce in cookies
    if (data.activationData) {
      res.cookie(constants.GOOGLE_AUTH_NONCE_COOKIE_NAME, data.activationData.nonce);
      res.cookie(constants.GOOGLE_AUTH_SECRET_COOKIE_NAME, data.activationData.secret);
    }

    res.status(200);
    res.json(data);
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
  });
}

function autheticateUser(req, res, next) {
  // secret is in the cookies
  var payload = {
    secret: libUtils.getGoogleAuthSecretCookieValue(req),
    challenge: req.body.otp
  }
  i2faServ.autheticateUser(req.securityContext, payload, function(err, userData) {
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
  });
}

module.exports = {
  getAuthenticationMethod: getAuthenticationMethod,
  getSoftAuthData: getSoftAuthData,
  activateDevice: activateDevice,
  autheticateUser: autheticateUser
}