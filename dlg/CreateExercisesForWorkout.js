var getLastSessionWithWorkout = require('./GetLastSessionWithWorkout');
var getSessionExercises = require('./GetSessionExercises');
var postExercises = require('./PostExercises');
var getPlanExercises = require('./GetPlanExercises');
var logger = require('toto-logger');

exports.do = function(correlationId, sessionId, workout) {

  logger.compute(correlationId, 'Retrieving last session for workout ' + JSON.stringify(workout), "info");

  return new Promise((success, failure) => {

    // 1. Check if there has been a session using this workout already
    getLastSessionWithWorkout.do(correlationId, workout).then((data) {

      logger.compute(correlationId, 'Last session for workout: ' + JSON.stringify(data), "info");

      // Id of the session that has been found
      let lastSessionId = data.id;

      // 2.a. If there has been, copy the exercises
      if (lastSessionId != null) {

        logger.compute(correlationId, 'Retrieving previous session exercises.', "info");

        // 2.a.1. Retrieve the exercises GET /session/:id/exercises
        getSessionExercises.do(correlationId, lastSessionId).then((exercises) => {

          logger.compute(correlationId, 'Found exercises, POSTing them for the new session.', "info");

          // 2.a.2. Post these exercises
          postExercises.do(correlationId, sessionId, exercises.exercises).then(success, failure);

        }, failure)

      }
      // 2.b. If there hasn't been, get the exercises from the plan
      else {

        let planId = workout.planId;

        // 2.b.1. Get the exercises from the plan
        getPlanExercises.do(correlationId, planId).then((planWorkoutExercises) => {

          // 2.b.2. Post these exercises
          postExercises.do(correlationId, sessionId, planWorkoutExercises.exercises).then(success, failure);

        }, failure)

      }

    }, failure);

  });

}
