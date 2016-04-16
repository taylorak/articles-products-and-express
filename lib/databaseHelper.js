var fs = require('fs');
var crypto = require('crypto');

function databaseHelper() {

  var _db = {};
  var _file;

  function _connect(file) {
    _file = file;
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

    // function _shallowClone(obj) {
    //   var clone = {};
    //   var keys = Object.keys(_schema);
    //   keys.forEach(function(key) {
    //     clone[key] = obj[key];
    //   });
    //   return clone;
    // }
    function _length() {
      var elements = Object.keys(_db).filter(function(key) {
        if(_db[key].model === name) {
          return true;
        }
        return false;
      });
      return elements.length;
    }

    function _all(cb) {
      var allData =  Object.keys(_db).reduce(function(prev, curr) {
        if(_db[curr].model === name) {
          prev.push(_db[curr]);
        }
        return prev;
      }, []);
      cb(null, allData);
    }

    function _add(obj, cb) {
      var hash = crypto.createHash('sha1').update(new Date().toString()).digest('hex');
      obj.model = name;
      _db[hash] = obj;

      fs.writeFile(_file, JSON.stringify(_db), function(err) {
        if(err) {
          cb(err);
        }
        cb(null);
      });
    }

    function _getById(id, cb) {
      _all(function(err, elements) {
        for(var i = 0; i < elements.length; i++) {
          if(elements[i][_id].toString() === id) {
            cb(null, elements[i]);
          }
        }
      });
    }

    function _editById(id, obj, cb) {
      _getById(id, function(err, element) {
        Object.keys(obj).forEach(function(key) {
          if(element.hasOwnProperty(key)) {
            element[key] = obj[key];
          }
        });

        fs.writeFile(_file, JSON.stringify(_db), function(err) {
          if(err) {
            cb(err);
          }
          cb(null);
        });
      });
    }

    function _deleteById(id, cb) {

      Object.keys(_db).forEach(function(key) {
        if(_db[key].model === name &&
         _db[key][_id].toString() === id) {
            delete _db[key];
            fs.writeFile(_file, JSON.stringify(_db), function(err) {
              if(err) {
                cb(err);
              }
              cb(null);
            });
          }
      });
      // cb(new Error());
    }

    function _clear(cb) {
      _db = {};
      fs.writeFile(_file, JSON.stringify(_db), function(err) {
        if(err) {
          cb(err);
        }
        cb(null);
      });
    }

    return {
      all : _all,
      add : _add,
      getById : _getById,
      editById: _editById,
      deleteById: _deleteById,
      length: _length
    };

  }

  return {
    connect : _connect,
    model : _model
  };

}

module.exports = databaseHelper();