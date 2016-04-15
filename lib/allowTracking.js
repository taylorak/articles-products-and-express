function allowTracking (req, res, next) {
  console.log(req.headers);
  if(req.headers.hasOwnProperty('x-do-not-track')){
    res.json({ error: 'sorry, we wanna track you' });
  }
  next();
}

module.exports = allowTracking;