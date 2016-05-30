/*
 * STS Service Abstraction
 */

var implementationModule = require('../../config').backend_services.sts.module;
console.log('STS implementationModule', implementationModule);
var service = require('./' + implementationModule);

function exchangeSessionTokenForSecContext(sessionToken, callback) {
  var errorObj;
  if(!sessionToken) {
    errorObj = new Error('Empty Session Token');
    errorObj.status = 401;
    callback(errorObj);
  }
  
  service.getSecurityContext(sessionToken, function(err, secContext) {
    if(err) {
      return callback(err);
    }

    callback(null, secContext);
  });
}

module.exports = {
	exchangeSessionTokenForSecContext: exchangeSessionTokenForSecContext
};
