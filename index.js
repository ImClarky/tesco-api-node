var request = require('request')

module.exports = function(api_key, proxy) {
  var self = this;
  self.baseURL = "https://dev.tescolabs.com/";

  self.request = {
    url: null,
    headers: {
      "Ocp-Apim-Subscription-Key": null
    },
    proxy: proxy
  }

  if (!api_key) {
    throw new Error("API Key must be provided");
  } else {
    self.request.headers["Ocp-Apim-Subscription-Key"] = api_key
  }

  self.getStores = function(options) {
    self.request.url = compileURL("locations/search", options)
    return callAPI();
  };

  self.getProductData = function(options) {
    self.request.url = compileURL("product", options)
    return callAPI();
  };

  self.grocerySearch = function(options) {
    self.request.url = compileURL("grocery/products", options);
    return callAPI();
  };

  var callAPI = function() {
    return new Promise(function(resolve, reject) {
      request(self.request, function(err, status, response) {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      })
    })
  }

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
