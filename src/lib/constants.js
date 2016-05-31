module.exports = {
  SESSION_TOKEN_COOKIE_NAME: 'session_token',
  GOOGLE_AUTH_NONCE_COOKIE_NAME: 'google_auth_nonce',
  GOOGLE_AUTH_SECRET_COOKIE_NAME: 'google_auth_secret',
  authTypes: {
    BASIC: 'basic',
    GOOGLE_AUTH: 'google_auth',
    U2F: 'u2f'
  },
  i2fasService: {
    POST_PAYLOAD: {
      algorithm: 'totp',
      app_name: 'GA',
      device_id: 'MAC',
      display_name: 'NG'
    }
  }
}