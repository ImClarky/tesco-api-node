var request = require('request')

module.exports = function(api_key) {
  var self = this;
  var self.baseURL = "https://dev.tescolabs.com/";

  if (!api_key) {
    throw new Error("API Key must be provided");
  } else {
    self.api_key = api_key;
  }

  self.getStores = function(options) {
    return new Promise(function(resolve, reject) {
      var url = compileURL("locations/search", options)

      request(url, function(err, status, response) {
        if (err) {
          reject(err);
        } else if (status.statuscode !== 200) {
          resolve(response);
        }
      });
    });
  };

  self.getProductData = function(options) {
    return new Promise(function(resolve, reject) {
      var url = compileURL("", options)

      request(url, function(err, status, response) {
        if (err) {
          reject(err);
        } else if (status.statuscode !== 200) {
          resolve(response);
        }
      });
    });
  };

  self.grocerySearch = function(options) {
    return new Promise(function(resolve, reject) {
      var url = compileURL("", options)

      request(url, function(err, status, response) {
        if (err) {
          reject(err);
        } else if (status.statuscode !== 200) {
          resolve(response);
        }
      });
    });
  };

  var compileURL = function(uri, params) {
    var s = self.baseURL + uri;
    var qs = [];

    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var _s = i + "=";

        if (typeof params[i] == "undefined") {
          continue;
        } else if (Array.isArray(params[i])) {
          params[i].forEach(function(v) {
            _s += v + ",";
          });
        } else if (typeof params[i] == "object") {
          for (var k in params[i]) {
            if (params[i].hasOwnProperty(k)) {
              _s += k + ":" + params[i][k] + " AND ";
            }
          }
        } else {
          _s += params[i];
        }

        _s = _s.trim().replace(/AND$|\,$/, "");

        qs.push(_s.trim());
      }
    }

    return s + (qs.length ? "?" + qs.join("&") : "");
  }
}
