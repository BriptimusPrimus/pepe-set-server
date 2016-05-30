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

function softAuthData(securityContext, payload, callback) {
  // Note: 
  // payload is part of the real POST request, not used here.
  // Will look like:
  // {"algorithm": "totp", "app_name": "GA", "device_id": "MAC", "display_name": "NG}
  var result;
  
  if(securityContext.use_case === 'type_basic') {
    result = {
      id: 'AAGmNbvdtDg7gxeLhRwvm4O2yE3sYhkT9mfRJFjCnP7_rOWwVLknZz_KOOVdbJ_pWw9hAph_ENsglfT4jRlMWpv1sVUQVQ==',
      secret: 'OA63RNHNN4A3S6Q2',
      uri: 'otpauth://totp/PayPal:TWOFAUSER01?secret=OA63RNHNN4A3S6Q2&issuer=PayPal',
      nonce: '2016-05-27T20:16:54Z5oUqW4UFG9J4tReDwREu73dzoSLcsWntWg3HNLdWi10'      
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
//   softAuthData: function(securityContext, payload, callback){}
// }
module.exports = {
	authenticatorType: authenticatorType,
  softAuthData: softAuthData
};