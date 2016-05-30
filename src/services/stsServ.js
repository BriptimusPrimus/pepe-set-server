/*
 * STS Service Abstraction
 */

var implementationModule = require('../../config').backend_services.sts.module;
console.log('STS implementationModule', implementationModule);
var service = require('./' + implementationModule);

function exchangeSessionTokenForSecContext(sessionToken, callback) {
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
