function allowTracking (req, res, next) {
  if(req.headers.hasOwnProperty('x-do-not-track')){
    res.json({ error: 'sorry, we wanna track you' });
  }
  next();
}

module.exports = allowTracking;