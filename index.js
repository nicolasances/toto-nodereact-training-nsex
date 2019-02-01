var express = require('express');
var Controller = require('toto-api-controller');
var TotoEventConsumer = require('toto-event-consumer');
var createExercises = require('./dlg/CreateExercises');
var validator = require('./validation/Validator');

var app = express;

/**
 * Consumes events of training sessions created and when received, it will start
 * creating the exercises for that session, with the following logic, for EACH WORKOUT:
 * - if there has been a session with that same workout, copy the workout exercises from that session to this session
 * - otherwise, copy the workout exercises from the plan into this session
 */
var eventConsumer = new TotoEventConsumer('react-training-nsex', 'trainingSessionsCreated', (message) => {

  // Extract the data from the message
  let eventData = JSON.parse(message.value);

  // Extract the correlationId
  let correlationId = eventData.correlationId;

  // Validate the message
  validator.do().then(() => {

    // Success
    console.log('[' + correlationId + '] - Captured event trainingSessionsCreated!');

    // Execute the right delegate
    createExercises.do(correlationId, eventData);

  }, (validationError) => {
    // Failure
    // Print the validation problem
    console.log('[' + correlationId + '] - Failure procesing the trainingSessionsCreated event: "' + validationError.message + '");

    // TODO: do something about it!
  })

});

var api = new Controller('react-training-nsex', app, null, eventConsumer);

/***********
 * START
 **********/
app.listen(8080, function() {
  console.log('React Training Nsex Microservice up and running');
});
