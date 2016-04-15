var fs = require('fs');

function checkArticleHeaders (req, res, next) {
  if(!req.headers.hasOwnProperty('version')){
    res.json({error: 'bad headers'});
  }
  next();
}

module.exports = checkArticleHeaders;