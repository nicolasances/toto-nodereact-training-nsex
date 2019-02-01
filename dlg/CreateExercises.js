
var createExercisesForWorkout = require('./CreateExercisesForWorkout')

exports.do = function(correlationId, data) {

  return new Promise((success, failure) => {

    let workouts = data.workouts;

    // Promises
    let promises = [];

    // Treat each workout separately
    for (var i = 0; i < workouts.length; i++) {

      console.log('[' + correlationId + '] - Creating exercises for workout ' + JSON.stringify(workouts[i]));

      promises.push(createExercisesForWorkout.do(correlationId, data.sessionId, workouts[i]));

    }

    // Wait for all promises to finish
    Promise.all(promises).then(success, failure);

  })

}
