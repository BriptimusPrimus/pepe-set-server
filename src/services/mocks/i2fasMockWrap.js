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
      secret: 'STUBL6JBENQ3K5PF--',
      type: 'SOFTWARE'
    }
  } else if(securityContext.use_case === 'type_unknown') {
    result = {
      id: 'AAGmNbvdtDg7gxeLhRwvm4O2yE3sYhkT9mfRJFjCnP7_rOWwVLknZz_KOOVdbJ_pWw9hAph_ENsglfT4jRlMWpv1sVUQVQ==',
      secret: 'STUBL6JBENQ3K5PF--',
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

function activate(securityContext, payload, callback) {
  // Note: 
  // Payload Will look like:
  // {"nonce":"2016-05-27T06:34:49Zf66FTWtIV3QU11z7OHi5A_GpU2adwX1AGg_EOBspM20", "secret":"STUBL6JBENQ3K5PF", "challenge": "449125"}
  var response;
  if(securityContext.use_case === 'type_basic'
    && payload.nonce === '2016-05-27T20:16:54Z5oUqW4UFG9J4tReDwREu73dzoSLcsWntWg3HNLdWi10' 
    && payload.secret === 'OA63RNHNN4A3S6Q2'
    && payload.challenge === '000000') {
      response = {
        statusCode: 200,
        result: 'activation_success'
      };
  } else {
    response = {
      statusCode: 400,
      result: 'activation_failure'
    };
  }
  
  setTimeout(function() {
    callback(null, response);
  }, configuration.mockResponseMiliseconds || 500);
}

function autheticate(securityContext, payload, callback) {
  // Note: 
  // Payload Will look like:  
  // { "secret":"STUBL6JBENQ3K5PF--", "challenge": "870827"}
  if(securityContext.use_case === 'type_google_auth'
    && payload.secret === 'STUBL6JBENQ3K5PF--'
    && payload.challenge === '111111') {
      response = {
        statusCode: 200,
        result: '2fa_login_success'
      };
  } else {
    response = {
      statusCode: 400,
      result: 'a2fa_login_failure'
    };
  }

  setTimeout(function() {
    callback(null, response);
  }, configuration.mockResponseMiliseconds || 500);  
}

// This object implements the bridge interface:
// interface: {
//   authenticatorType: function(securityContext, callback){}
//   softAuthData: function(securityContext, payload, callback){}
//   activate: function(securityContext, payload, callback){}
//   autheticate: function(securityContext, payload, callback){}
// }
module.exports = {
	authenticatorType: authenticatorType,
  softAuthData: softAuthData,
  activate: activate,
  autheticate: autheticate
};