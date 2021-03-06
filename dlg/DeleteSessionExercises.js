var http = require('toto-request');

exports.do = (correlationId, sessionId) => {

  return new Promise((success, failure) => {

    // Request
    let request = {
      correlationId: correlationId,
      microservice: 'toto-nodems-training-session',
      method: 'DELETE',
      resource: 'sessions/' + sessionId + '/exercises'
    };

    // Call
    http(request).then(success, failure);

  })
}
