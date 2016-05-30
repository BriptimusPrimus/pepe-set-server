/*
 * STS Mock Service Wrapper
 */

var configuration = require('../../../config');

function authenticatorType(securityContext, callback) {
  var result;

  if(securityContext.use_case === 'type_basic') {
    restult = {};
  } else if(securityContext.use_case === 'type_google_auth') {
    result = {
      id: 'AAGmNbvdtDg7gxeLhRwvm4O2yE3sYhkT9mfRJFjCnP7_rOWwVLknZz_KOOVdbJ_pWw9hAph_ENsglfT4jRlMWpv1sVUQVQ==',
      secret: 'OA63RNHNN4A3S6Q2',
      type: 'SOFTWARE'
    }
  } else if(securityContext.use_case === 'type_unknown') {
    result = {
      id: 'AAGmNbvdtDg7gxeLhRwvm4O2yE3sYhkT9mfRJFjCnP7_rOWwVLknZz_KOOVdbJ_pWw9hAph_ENsglfT4jRlMWpv1sVUQVQ==',
      secret: 'OA63RNHNN4A3S6Q2',
      type: 'XXXYYYZZZ'
    }
  } else {
    result = {};
  }

  setTimeout(function() {
    callback(null, result);
  }, configuration.mockResponseMiliseconds || 500);
}



// This object implements the bridge interface:
// interface: {
//   authenticatorType: function(securityContext, callback){}
// }
module.exports = {
	authenticatorType: authenticatorType
};