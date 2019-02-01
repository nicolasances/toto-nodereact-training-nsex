
exports.do = (event) => {

  return new Promise((success, failure) => {

    // Missing fields
    let missingFields = [];

    // Find out if there are missing fields
    if (event.correlationId == null) missingFields.push('correlationId');
    if (event.sessionId == null) missingFields.push('sessionId');
    if (event.date == null) missingFields.push('date');
    if (event.workouts == null || event.workouts.length == 0) missingFields.push('workouts');

    // Check that every workout has the required info: planId and workoutId
    for (var i = 0; i < event.workouts.length; i++) {

      let w = event.workouts[i];

      if (w.workoutId == null) missingFields.push('workouts[' + i + '].workoutId');
      if (w.planId == null) missingFields.push('workouts[' + i + '].planId');

    }

    // Success or failure
    if (missingFields.length > 0) failure({code: 400, message: 'Missing fields: ' + JSON.stringify(missingFields)});
    else success();

  })
}
