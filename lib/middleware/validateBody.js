function validateBody(bodyParams) {
  return function(req, res, next) {
    var body = req.body;
    var errors = {};
    var isValid = true;

    Object.keys(bodyParams).forEach(function(key) {

      if(bodyParams[key] === 'number'){
        if(parseInt(body[key]).toString() !== body[key]) {
          errors[key] = "<em>ERROR:</em> Please enter a monetary value!";
          isValid = false;
        }
      }

      if(bodyParams[key] === 'boolean' && body[key] !== 'true' && body[key] !== 'false') {
        errors[key] = "Should be a boolean";
        isValid = false;
      }

      if(body[key] === '') {
        errors[key] = "<em>ERROR:</em> Cannot submit empty fields!";
        isValid = false;
      }

      if(!body.hasOwnProperty(key)) {
        errors[key] = "Key " + key + " does not exist";
        isValid = false;
      }
    });

    if(isValid) {
      next();
    } else {
      res.json(400, { success: false, errors : errors });
    }
  };
}

module.exports = validateBody;