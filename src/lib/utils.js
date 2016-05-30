var constants = require('./constants');

function getSessionTokenCookieValue(req) {
  return req.cookies[constants.SESSION_TOKEN_COOKIE_NAME];
}

module.exports = {
	getSessionTokenCookieValue: getSessionTokenCookieValue
};