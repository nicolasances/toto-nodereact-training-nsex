var http = require('request');

exports.do = (correlationId, planId, workoutId) => {

  return new Promise((success, failure) => {

    // Request
    let request = {
      url: 'http://toto-nodems-training-plan:8080/plans/' + planId + '/workouts/' + workoutId + '/exercises',
      method: 'GET',
      headers: {
        'x-correlation-id': correlationId
      }
    };

    // Call
    http(request, (err, resp, body) => {

      if (err != null) {failure({code: 500, message: err}); return;}
      if (body == null) {failure({code: 404, message: 'No body returned for plan ' + planId}); return;}

      try {
        // Parse the body
        let b = JSON.parse(body);

        // Success
        success(b);

      } catch (e) {

        failure({code: 500, message: e});
      }

    })
  })
}
