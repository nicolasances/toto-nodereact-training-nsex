var logger = require('toto-logger');
var deleteSessionExercises = require('../DeleteSessionExercises');

exports.do = (event) => {

  // Extract the correlationId
  let correlationId = event.correlationId;

  deleteSessionExercises.do(correlationId, event.sessionId).then(() => {

    logger.compute(correlationId, 'Successfully deleted the exercises for session ' + event.sessionId, 'info');

  }, (err) => {

    logger.compute(correlationId, 'Error deleting the exercises for session ' + event.sessionId + '. Err: ' + err, 'error');

  });

}
