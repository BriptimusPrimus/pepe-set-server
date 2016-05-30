/*
 * STS Service Wrapper
 */

function getSecurityContext(sessionToken, callback) {
  // TODO: make request to STS endpoint to 
  // fetch security context
  
  callback(null, {
    recurity_context: 'EMPTY SECURITY CONTEXT'
  });
}

// This object implements the bridge interface:
// interface: {
//   getSecurityContext: function(sessionToken, callback){}
// }
module.exports = {
	getSecurityContext: getSecurityContext
};