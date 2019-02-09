var http = require('toto-request');

exports.do = (sessionId, exercise) => {

  return new Promise((success, failure) => {

    // Define the body of the POST request
    let body = exercise;

    // Change the session id (to the newly created session)
    body.sessionId = sessionId;

    // Remove the id
    body.id = null;

    // Request
    let request = {
      correlationId: correlationId,
      microservice: 'toto-nodems-training-session',
      method: 'POST',
      resource: 'sessions/' + sessionId + '/exercises',
      body: body
    };

    // Call
    http(request).then(success, failure);

  });
}
