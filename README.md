## Tesco API for NodeJS

This package is a small and simple wrapper for the Tesco Supermarket's API which returns the results as a Promise.

More information about the API can be found out at their website: https://devportal.tescolabs.com/
##

### Installation
```
npm install tesco-api-node
```
#### Requirements
- **API Key:** This can be obtained by creating a profile on the Dev Portal, and [subscribing](https://devportal.tescolabs.com/products/56c73300d73fa303ed060001) to the APIs.
##
### Usage
Firstly, `require` the package in your script:

```js
var TescoAPI = require("tesco-api-node");
```

Now create a new instance of the wrapper:

```js
var instance = new TescoAPI(YOUR-API-KEY);
```

Replacing `YOUR-API-KEY` with the key provided on your DevPortal Profile page.

There is also an optional second paramter, in which you can pass a URL for a proxy. This wrapper was developed behind a proxy,
and I encounterd `ECONNREFUSED` errors until I provided a proxy in the request headers. An example of use with a proxy:

```js
var instance = new TescoAPI("mysuperlongAPIKey1234567890", "http://myproxyaddress.com:8080");
```

#### Store location
This API allows you to search for stores and get information like Name, Branch Number, Contact Details, Opening Hours and Facilities.

To access this API, use the `getStores()` function, like so:
```js
instance.getStores(options)
  .then(function(data){
    //Do some stuff
  });
```

#### Grocery Search
This API, as the name suggests, allows you to search for groceries and receive data like Name, Description, Price, Promotions etc.

To access this API, use the `grocerySearch()` function, like so:
```js
instance.grocerySearch(options)
  .then(function(data){
    //Do some stuff
  });
```
#### Product Data
This API allows you to get more information about a particular product, such as the Brand, Description, Marketing Text, Packaging dimensions etc.

To access the API, use the `getProductData()` function, like so:
```js
instance.getProductData(options)
  .then(function(data){
    //Do some stuff
  });
```
#### Options
The options parameter is required by all of the above functions as it provides the API with the query parameters.

The options parameter should be a javascript object, with the data as key-value pairs, for example:

```js
var options = {
  limit: 10,
  offset: 0
}
```

In some cases, a query paramter may have multiple values associated with it. For example, using the Store Location API, you may want to supply a Filter paramter and you want to filter the stores by a country code ('GB' for example) and it it has ATm facilities. To do that you would provide an object to the `filter` key, with the key-values of the filters, like so:

```js
var options = {
  limit: 10,
  offset: 0,
  filter: {
    isoCountryCode: "GB",
    facilities: "ATM"
  }
}
```

You may also want to specifiy the fields that are returned in the dataset. To do so, provide an array with the list of fields / properties, for example:

```js
var options = {
  limit: 10,
  offset: 0,
  fields: [
    "name",
    "altIds.branchNumber"
  ]
}
```
**Note:** The field options are currently only supported in the Store Location API.

##### Known Limitations
There are a few minor limitations regarding the options parameter:

- Store Location API
  - Using the `Filter` property, if you wanted to list more than one facility, for example, you would currently not be able to as you would need to declare the `facilities` key twice.  I will be working on making it so you can enter an array of facilities, which will be iterated over.
- Product Data API
  - You can currently not supply more than one option for either the GTIN/TPNB/TPNC/CATID parameters, but you can supply one of each in one query.

*Disclaimer:* The limitations are due to the current state of the wrapper code and not the Tesco API.


[A full cheatsheet of options can be found here](./option-cheatsheet.md).

#### Examples

##### Store Location API - Looking for Tesco store names, beginning with C, that have ATMs
```js
var TescoAPI = require("tesco-api-node");
var instance = new TescoAPI("myreallylongapikey1234567890");

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
  .then(function(results){
    console.log(results);
  })
```
Which produces something like the following:
```js
{
  "results":[
    {
      "location":{
        "id":"1841e03c-b2af-47e1-9e6c-e162e0efdc17",
        "name":"Croydon Addiscombe Esso Express"
      }
    },
    {
      "location":{
        "id":"a9f90aa3-2ae3-4b04-9899-2c194360b12a",
        "name":"Cambridge Bar Hill Extra"
      }
    },
    {
      "location":{
        "id":"2940361c-fb12-4119-b645-e5fec6b7b173",
        "name":"Cregiau Express"
      }
    },
    {
      //...
    }
  ]
}

```
##
### TODO
- [ ] Implement further iteration down the options object
- [ ] Allow multiple options of the same key
