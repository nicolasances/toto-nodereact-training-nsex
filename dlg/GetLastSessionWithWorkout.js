var http = require('toto-request');

/**
 * Workout: {
 *  workoutId: id of the workout,
 *  planId: id of the plan
 * }
 */
exports.do = (correlationId, workout) => {

  return new Promise((success, failure) => {

    try {

      let wid = workout.workoutId;

      // Get the last session with that workout Id
      let call = {
        correlationId: correlationId,
        microservice: 'toto-nodems-training-session',
        method: 'GET',
        resource: 'sessions?wid=' + wid + '&sort=date&sortDir=desc&maxResults=2'
      };

      // Call the API
      http(call).then((apiResp) => {

        try {

          // If there is no session for that workout
          if (apiResp.sessions == null || apiResp.sessions.length < 2) {success({});}
          // Return the first session (only one)
          else success(apiResp.sessions[1]);

        } catch (e) {

          // Failure
          failure({code: 500, message: e})

        }

      }, failure);

    } catch (e) {

      console.log(e);

      // Failure
      failure({code: 500, message: e})

    }

  });

}
