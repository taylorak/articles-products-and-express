var fs = require('fs');
var crypto = require('crypto');

function databaseHelper() {

  var _db = {};

  function _connect(file) {
    fs.stat(file, function(err, stats) {
      if(err) {
        if(err.code === 'ENOENT') {
          fs.writeFile(file, JSON.stringify(_db), function(err) {
            if(err) throw err;
          });
        }
      } else {
        fs.readFile(file, 'utf8', function(err, data) {
          if (err) throw err;
          _db = JSON.parse(data);
        });
      }
    });
  }

  function _model(name, schema) {

    var _id;
    var _schema;

    var keys = Object.keys(schema);
    for(var i = 0; i < keys.length; i++) {
      if(schema[keys[i]].id === true) {
        _id = keys[i];
      }
    }

    _schema = schema;

    function _shallowClone(obj) {
      var clone = {};
      var keys = Object.keys(_schema);
      Object.keys(keys).forEach(function(key) {
        clone[key] = obj[key];
      });
    }

    function _all() {
      return Object.keys(_db).reduce(function(prev, curr) {
        if(_db[curr].model === name) {
          prev.push(_db[curr]);
        }
        return prev;
      }, []);
    }

    function _add(obj) {
      var hash = crypto.createHash('sha1').update(new Date().toString()).digest('hex');
      obj.model = name;
      _db[hash] = obj;
      console.log(_db);
    }

    function _getById(id) {
      var elements = _all();
      console.log("poop", elements);
      for(var i = 0; i < elements.length; i++) {
        if(elements[i][_id].toString() === id) {
          return elements[i];
        }
      }
    }

    function _editById(id) {

    }

    return {
      all : _all,
      add : _add,
      getById : _getById,
      editById: _editById
      //editByTitle : _editByTitle
    };

  }

  return {
    connect : _connect,
    model : _model
  };

}

module.exports = databaseHelper();