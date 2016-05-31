var constants = require('./constants');

function getSessionTokenCookieValue(req) {
  console.log('REQ COOKIES:', req.cookies);
  return req.cookies[constants.SESSION_TOKEN_COOKIE_NAME];
}

function getGoogleAuthNonceCookieValue(req) {
  return req.cookies[constants.GOOGLE_AUTH_NONCE_COOKIE_NAME];
}

function getGoogleAuthSecretCookieValue(req) {
  return req.cookies[constants.GOOGLE_AUTH_SECRET_COOKIE_NAME];
}

function isObjectEmpty(obj) {
    // null and undefined are "empty"
    if (!obj) {
      return true;
    }

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) {
      return false; 
    }
    if (obj.length === 0) {
      return true;
    }

    // Otherwise, does it have any properties of its own?
    if (Object.keys(obj).length > 0) {
      return false;
    }

    return true;  
}

module.exports = {
	getSessionTokenCookieValue: getSessionTokenCookieValue,
  getGoogleAuthNonceCookieValue: getGoogleAuthNonceCookieValue,
  getGoogleAuthSecretCookieValue: getGoogleAuthSecretCookieValue,
  isObjectEmpty: isObjectEmpty
};