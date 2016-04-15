var fs = require('fs');
var moment = require('moment');

function logger (req, res, next) {
  var now = moment(new Date());
  var date = now.format('YYYY.MM.DD');

  var entry = {
    method: req.method,
    uri: req.url,
    timeStamp: now,
    headers: req.headers
  };

  fs.appendFile("./logs/"+date+".LOG", JSON.stringify(entry), function (err, cb) {
  });
  next();
}

module.exports = logger;