var stsServ = require('../services/stsServ');
var libUtils = require('../lib/utils');

function fetchSecurityContext(req, res, next) {
  var errorObj;
  var sessionTokenVal = libUtils.getSessionTokenCookieValue(req);
  console.log('sessionTokenVal:', sessionTokenVal);
  
  stsServ.exchangeSessionTokenForSecContext(sessionTokenVal, function(err, secContext) {
    if(err) {
      return next(err);
    }

    if(!secContext) {
      errorObj = new Error('Invalid Security Context');
      errorObj.status = 401; 
      next(errorObj);
    }

    req.securityContext = secContext;
    next();
  });
}

module.exports = {
  fetchSecurityContext: fetchSecurityContext  
}