# Tesco API for NodeJS

This package is a small and simple wrapper for the Tesco Supermarket's API which returns the results as a Promise.

More information about the API can be found out at their website: https://devportal.tescolabs.com/

## Installation
```
npm install tesco-api-node
```
### Requirements
- **API Key:** This can be obtained by creating a profile on the Dev Portal, and [subscribing](https://devportal.tescolabs.com/products/56c73300d73fa303ed060001) to the APIs.

## Usage
Firstly, `require` the package in your script:

```js
var TescoAPI = require("tesco-api-node");
```

Now create a new instance of the wrapper:

```js
var api = new TescoAPI(YOUR_API_KEY [, proxy]);
```
#### Parameters
- **YOUR_API_KEY**: Pretty self-explanatory.
- **proxy** (Optional): If you are accessing the Tesco API from behind a proxy, you can pass the url as a string here.

### Using the Wrapper
There are currently three available methods, relating to each of the APIs - Store Location, Grocery Search and Product Data.

Each method returns a new Promise to be handled.

```js
//Store Location
api.getStores(options)
  .then((results) => {
    // Do Something
  })
  .catch((err) => {
    // Handle Error
  })

//Grocery Search
api.grocerySearch(options)
  .then((results) => {
    // Do Something
  })
  .catch((err) => {
    // Handle Error
  })

//Product Data
api.getProductData(options)
  .then((results) => {
    // Do Something
  })
  .catch((err) => {
    // Handle Error
  })
```

The results returned from these methods are the raw data from the API itself.

#### Parameters
Each function takes in one parameter. This should be a JavaScript object containing key-value options.

You can check out the [Options Cheatsheet](https://github.com/ImClarky/tesco-api-node/blob/master/option-cheatsheet.md) to see the available options for each API.

### Examples
Here are a few examples of the module in action.

#### Store Locations API - Get all stores beginning with 'C', that have ATM facilities, and sort by their distance from 'London, UK'

```js
var api = new TescoAPI("myreallylongapikey1234567890")
var options = {
  like: {
    name: "^C"
  },
  filter: {
    facilities: "ATM"
  },
  sort:{
    near: "London, UK"
  }
}

api.getStores(options)
  .then((results) => {
    // Process Results
  })
  .catch((err) => {
    // Handle Error
  })
```

#### Grocery Search API - Get top 50 results related to 'Chocolate'

```js
var api = new TescoAPI("myreallylongapikey1234567890")
var options = {
  limit: 50,
  query: "Chocolate"
}

api.grocerySearch(options)
  .then((results) => {
    // Process Results
  })
  .catch((err) => {
    // Handle Error
  })
```

#### Product Data API - Get product details for two products using their TPNC numbers

```js
var api = new TescoAPI("myreallylongapikey1234567890")
var options = {
  tpnc: [
    "255245446",
    "288481294"
  ]
}

api.getProductData(options)
  .then((results) => {
    // Process Results
  })
  .catch((err) => {
    // Handle Error
  })
```

## Licence
MIT
