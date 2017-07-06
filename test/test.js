var assert = require('chai').assert
var expect = require('chai').expect

var key = "220c65bed15a4151b3c3ad915fb0ceb7"
var TescoAPI = require('../')
var compileQuery = require('../lib/compile-query')
var baseURL = "https://dev.tescolabs.com/"

var api = new TescoAPI(key, "http://globalproxy.dhl.com:8080")

describe("Test Query String Creation", () => {

  it("Grocery Search API - Simple Grocery Search", () => {
    var options = {
      query: "Chocolate"
    }

    assert.equal(compileQuery(baseURL + "grocery/products", options), "https://dev.tescolabs.com/grocery/products?limit=10&offset=0&query=Chocolate")
  })

  it("Product Data API - Single Product using GTIN", () => {
    var options = {
      gtin: "0721866180131"
    }

    assert.equal(compileQuery(baseURL + "product", options), "https://dev.tescolabs.com/product?gtin=0721866180131")
  })

  it("Product Data API - Multiple Products using multiple TPNC", () => {
    var options = {
      tpnc: [
        "255245446",
        "288481294"
      ]
    }

    assert.equal(compileQuery(baseURL + "product", options), "https://dev.tescolabs.com/product?tpnc=255245446&tpnc=288481294")
  })

  it("Store Location API - Near London, UK, with ATM and Click and Collect facilities", () => {
    var options = {
      sort: {
        near: "London, UK"
      },
      filter: {
        facilities: [
          "ATM",
          "Click and Collect"
        ]
      }
    }

    assert.equal(compileQuery(baseURL + "locations/search", options), 'https://dev.tescolabs.com/locations/search?limit=10&offset=0&sort=near:"London, UK"&filter=facilities:ATM AND facilities:Click and Collect')
  })
})

describe("Test API Results", () => {
  it("Grocery Search API - Search - with Limit as 20", () => {
    var options = {
      limit: 20,
      query: "Chocolate"
    }
    api.grocerySearch(options)
    .then((results) => {
      assert.equal(results.length, 20)
    })
    .catch((err) => {

    })
  })

  it("Product Data API - Get Product data for 2 products (TPNC)", () => {
    var options = {
      tpnc: [
        "255245446",
        "288481294"
      ]
    }

    api.getProductData(options)
    .then((results) => {
      assert.equal(results.length, 2)
    })
    .catch((err) => {

    })
  })

  it("Store Locations API - Get stores near London, UK with ATM Facilities and facilities like 'Click' and Limit 1", () => {
    var options = {
      limit: 1,
      sort: {
        near: "London, UK"
      },
      filter: {
        facilities: [
          "ATM",
        ]
      },
      like: {
        facilities: "click"
      }
    }

    api.getStores(options)
    .then((results) => {
      assert.equal(results.location.name, "Covent Garden Metro")
    })
    .catch((err) => {

    })
  })
})
