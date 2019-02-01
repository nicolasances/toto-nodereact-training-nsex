var http = require('request');

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
      url: 'http://toto-nodems-training-session:8080/sessions/' + sessionId + '/exercises',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-correlation-id': correlationId
      },
      body: JSON.stringify(body);
    };

    // Call
    http(request, (err, resp, body) => {

      // Check for problems
      if (err != null) {failure({code: 500, message: err}); return;}

      try {

        // Get the id of the created exercise
        let createdId = JSON.parse(body).id;

        // Success
        success({id: createdId});

      } catch (e) {

        // Fail
        failure({code: 500, message: e});

      }

    });

  });
}
