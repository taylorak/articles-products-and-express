function validateBody(bodyParams) {
  return function(req, res, next) {
    var body = req.body;
    var errors = {};
    var isValid = true;

    Object.keys(bodyParams).forEach(function(key) {

      if(bodyParams[key] === 'number'){
        if(parseInt(body[key]).toString() !== body[key]) {
          errors[key] = "Should be a number";
          isValid = false;
        }
      }

      if(bodyParams[key] === 'boolean' && body[key] !== 'true' && body[key] !== 'false') {
        errors[key] = "Should be a boolean";
        isValid = false;
      }
      console.log(body[key]);
      if(body[key] === '') {
        errors[key] = "Please enter field";
        isValid = false;
      }

      if(!body.hasOwnProperty(key)) {
        errors[key] = "Key " + key + " does not exist";
        return false;
      }
    });

    if(isValid) {
      next();
    } else {
      res.json({ success: false, errors : errors });
    }
  };
}

module.exports = validateBody;