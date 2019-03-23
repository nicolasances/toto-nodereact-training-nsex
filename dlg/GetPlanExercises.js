var http = require('toto-request');

exports.do = (correlationId, planId, workoutId) => {

  return new Promise((success, failure) => {

    // Request
    let request = {
      correlationId: correlationId,
      microservice: 'toto-nodems-training-plan',
      method: 'GET',
      resource: 'plans/' + planId + '/workouts/' + workoutId + '/exercises'
    };

    // Call
    http(request).then(success, failure);

  })
}
