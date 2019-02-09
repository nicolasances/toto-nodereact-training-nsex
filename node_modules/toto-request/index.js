var httpRequest = require('request');
var logger = require('toto-logger');
var validator = require('./validation/Validator');

/**
 * This function makes an http call and returns a standard Promise
 */
module.exports.http = function(req) {

  return new Promise((success, failure) => {

    // Validate the data
    let validationResult = validator.validate(req);

    if (validationResult.code == 400) {failure(validationResult); return;}

    // Default method: GET
    let method = (req.method != null) ? req.method : 'GET';

    // Append '/' in front of the resource, in case it's missing
    let res = resource.indexOf('/') == 0 ? resource : ('/' + resource);

    // Define the request parameters
    let httpReq = {
      url: 'http://' + req.microservice + ':8080' + req.resource,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-correlation-id': req.correlationId
      }
    }

    // In case there's a body
    if (req.body != null) httpReq.body = JSON.stringify(body);

    // Logging
    logger.apiOut(req.correlationId, req.microservice, method, req.resource);

    // Calling
    httpRequest(httpReq, (err, resp, body) => {

      if (err != null) {failure({code: 500, message: err}); return;}

      try {
        // Parse the body
        let responseBody = JSON.parse(body);

        // Success
        success(responseBody);

      } catch (e) {
        // Fail
        failure({code: 500, message: e});
      }

    });
  });
}
