var TescoAPI = require('../index.js');

var t = new TescoAPI("220c65bed15a4151b3c3ad915fb0ceb7", "http://globalproxy.dhl.com:8080");

var options = {
  limit: 1,
  offset: 0,
  query: "cadbury"
}

t.grocerySearch(options)
  .then(function(data) {
    console.log(data);
  })
