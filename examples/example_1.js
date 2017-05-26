/**
 * Example 1
 *
 *
 */

var TescoAPI = require('../index.js');
var instance = new TescoAPI('220c65bed15a4151b3c3ad915fb0ceb7', "http://globalproxy.dhl.com:8080");

var options = {
  offset: 0,
  limit: 10,
  like: {
    name: "^C"
  },
  filter: {
    facilities: "ATM"
  },
  fields: [
    "name"
  ]
}

instance.getStores(options)
  .then(function(results) {
    console.log(results);
  })
