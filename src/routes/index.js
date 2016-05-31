/*
 * Routes
 */

var express = require('express');
var userTokensController = require('../controllers/userTokens');
var googleAuthController = require('../controllers/googleAuth');

var router = express.Router();

/* GET authentication method and data. */
router.get('/user_auth_server_method',
  userTokensController.fetchSecurityContext, 
  function(req, res, next) {
    console.log('fethed Security Context:', JSON.stringify(req.securityContext));
    next();
  },
  googleAuthController.getAuthenticationMethod
);

/* GET Google Authenticator software authenticators. */
router.get('/google_soft_auth',
  userTokensController.fetchSecurityContext,
  function(req, res, next) {
    console.log('fethed Security Context:', JSON.stringify(req.securityContext));
    next();
  },
  googleAuthController.getSoftAuthData
);

/* POST Activate Google Authenticator */
router.post('/activate_google_auth',
  userTokensController.fetchSecurityContext,
  function(req, res, next) {
    console.log('fethed Security Context:', JSON.stringify(req.securityContext));
    next();
  },
  googleAuthController.activateDevice
);

/* POST Authenticate with Google Authenticator */
router.post('/authenticate_google_auth',
  userTokensController.fetchSecurityContext,
  function(req, res, next) {
    console.log('fethed Security Context:', JSON.stringify(req.securityContext));
    next();
  }
);

module.exports = router;