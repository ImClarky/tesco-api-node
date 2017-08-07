const request = require('request')
const compileQueryString = require('./compile-query')

module.exports = function(api_key, proxy) {
  let self = this
  self.baseURL = "https://dev.tescolabs.com/"

  self.request = {
    url: null,
    headers: {
      "Ocp-Apim-Subscription-Key": null
    },
    proxy: proxy
  }

  if (!api_key) {
    throw new Error("API Key must be provided")
  } else {
    self.request.headers["Ocp-Apim-Subscription-Key"] = api_key
  }

  self.getStores = options => {
    self.request.url = compileQueryString(self.baseURL + "locations/search", options)
    return callAPI()
  };

  self.getProductData = options => {
    self.request.url = compileQueryString(self.baseURL + "product", options)
    return callAPI()
  };

  self.grocerySearch = options => {
    self.request.url = compileQueryString(self.baseURL + "grocery/products", options)
    return callAPI()
  };

  var callAPI = () => {
    return new Promise((resolve, reject) => {
      request(self.request, (err, status, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  }
}
