/*
 * STS Mock Service Wrapper
 */

function getSecurityContext(sessionToken, callback) {
  // TODO: add mock logic here
  
  callback({
    recurity_context: 'MOCK SECURITY CONTEXT'
  });
}

// This object implements the bridge interface:
// interface: {
//   getSecurityContext: function(sessionToken, callback){}
// }
module.exports = {
	getSecurityContext: getSecurityContext
};