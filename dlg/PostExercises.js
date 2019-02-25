var postExercise = require('./PostExercise');

exports.do = (correlationId, sessionId, exercises) => {

  return new Promise((success, failure) => {

    // Array of promises, so I can wait for the completion of all of them
    var promises = [];

    // For each exercise, POST it
    for (var i = 0; i < exercises.length; i++) {

      promises.push(postExercise.do(correlationId, sessionId, exercises[i], i));

    }

    // Wait for all promises to complete
    Promise.all(promises).then(success, failure);

  });
}
