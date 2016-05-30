/*
 * googleAuth Controller
 */

var i2faServ = require('../services/i2fasServ');

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

module.exports = {
  getAuthenticationMethod: getAuthenticationMethod  
}