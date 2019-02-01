var http = require('request');

/**
 * Workout: {
 *  workoutId: id of the workout,
 *  planId: id of the plan
 * }
exports.do = (correlationId, workout) => {

  return new Promise((success, failure) => {

    let wid = workout.workoutId;

    // Get the last session with that workout Id
    let call = {
      url: 'http://toto-nodems-training-session:8080/sessions?wid=' + wid + '&sort=date&sortDir=desc&maxResults=1',
      method: 'GET',
      headers: {
        'x-correlation-id': correlationId
      }
    };

    // Call the API
    http(call, (err, resp, body) => {

      // Check for problems
      if (err != null) {failure({code: 500, message: err}); return;}
      if (body == null) {failure({code: 404, message: 'No body returned for workout ' + wid}); return;}

      try {

        // Parse the body
        let apiResp = JSON.parse(body);

        // If there is no session for that workout
        if (apiResp.sessions == null || apiResp.sessions.length == 0) {success({});}
        // Return the first session (only one)
        else success(apiResp.sessions[0]);

      } catch (e) {

        // Failure
        failure({code: 500, message: e})

      }

    });

  });

}
