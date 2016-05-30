/*
 * STS Mock Service Wrapper
 */

var configuration = require('../../../config');

function getSecurityContext(sessionToken, callback) {

  var secContext = {
    "use_case": sessionToken,
    "subjects": [{
      "subject": {
        "public_credential": "TWOFAUSER01",
        "id": "11339226",
        "account_number": "2226156280263819193",
        "party_id": "1984903268342642250",
        "user_type": "CONSUMER"
      }
    }]
  }
  
  setTimeout(function() {
    callback(null, secContext);
  }, configuration.mockResponseMiliseconds || 500);
}

// This object implements the bridge interface:
// interface: {
//   getSecurityContext: function(sessionToken, callback){}
// }
module.exports = {
	getSecurityContext: getSecurityContext
};