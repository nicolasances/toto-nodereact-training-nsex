var Controller = require('toto-api-controller');
var TotoEventConsumer = require('toto-event-consumer');
var createExercises = require('./dlg/CreateExercises');
var validator = require('./validation/Validator');
var logger = require('toto-logger');

/**
 * Consumes events of training sessions created and when received, it will start
 * creating the exercises for that session, with the following logic, for EACH WORKOUT:
 * - if there has been a session with that same workout, copy the workout exercises from that session to this session
 * - otherwise, copy the workout exercises from the plan into this session
 */
var eventConsumer = new TotoEventConsumer('react-training-nsex', 'trainingSessionsCreated', (event) => {

  // Extract the correlationId
  let correlationId = event.correlationId;

  // Validate the message
  validator.do().then(() => {

    // Success
    logger.compute(correlationId, "Captured event trainingSessionsCreated", "info");

    // Execute the right delegate
    createExercises.do(correlationId, event);

  }, (validationError) => {
    // Failure
    // Print the validation problem
    logger.compute(correlationId, "Failure procesing the trainingSessionsCreated event: " + validationError.message, "error");

    // TODO: do something about it!
  })

});

var api = new Controller('react-training-nsex', null, eventConsumer);

api.listen();
