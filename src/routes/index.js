/*
 * Routes
 */

var express = require('express');
var router = express.Router();

/* GET authentication method and data. */
router.get('/user_auth_server_method', function(req, res, next) {
  // console.log('GET /user_auth_server_method');
  next();
});

/* GET Google Authenticator software authenticators. */
router.get('/google_soft_auth', function(req, res, next) {
  console.log('GET /google_soft_auth');
  next();
});

/* POST Activate Google Authenticator */
router.post('/activate_google_auth', function(req, res, next) {
  console.log('POST activate_google_auth');
  next();
});

/* POST Authenticate with Google Authenticator */
router.post('/authenticate_google_auth', function(req, res, next) {
  console.log('POST /authenticate_google_auth');
  next();
});

module.exports = router;