# Options Cheatsheet

This is a cheatsheet of all the options available for each of the APIs.

## Grocery Search API

| Option | Description | Expected Value(s) |
| --- | --- | --- |
| limit | The amount of results to return. If no value is provided, the API default is used. *Default: 10* | Non-Negative Integer |
| offset | How many results to offset. If no value is provided, the API default is used. *Default: 0* | Non-Negative Integer |
| query | The search term to query. | Non-Empty String |

### Example Object

```js
var options = {
  limit: 10,
  offset: 20,
  query: "cereal"
}
```


## Product Data API

| Option | Description | Expected Value(s) |
| --- | --- | --- |
| gtin | The Global Trade Identification Number or EAN13 number of the product(s) | String, <br> String Array |
| tpnb | Tesco Product Number (Base Product) of the product(s) | String, <br> String Array |
| tpnc | Tesco Product Number (Consumer Unit) of the product(s) | String, <br> String Array |
| catid | Tesco Catalogue Number of the product(s) | String, <br> String Array |

### Example Object

```js
var options = {
  gtin: [
    "2530221899103",
    "5321089406604",
    "5045897533301",
  ]
}
// Note: Above are just random numbers
```

## Store Locations API

| Option | Description | Expected Value(s) |
| --- | --- | --- |
| limit | The amount of results to return. If no value is provided, the API default is used. *Default: 10* | Non-Negative Integer |
| offset | How many results to offset. If no value is provided, the API default is used. *Default: 0* | Non-Negative Integer |
| sort | What to sort the results by. | Object |
| sort.near | This is currently the only option to sort the results by. It sorts the results based on their distance from the given location, where the location is either a postcode or place name. | String |
| filter | Filter the results | Object |
| filter.name | Filter the results based on a name of a location | String, <br> String Array |
| filter.branchNumber | A legacy Branch Number | String, <br> String Array |
| filter.isoCountryCode | A two character country code, `gb` for example | String, <br> String Array |
| filter.facilities | A facilility name. *A full list of known facilities can be found below* | String, <br> String Array |
| filter.category | A location category, `store` for example | String, <br> String Array |
| filter.type | A location type, `extra` for example | String, <br> String Array |
| filter.status | A location's current status, `trading` for example | String, <br> String Array |
| like | The `like` option is similar to the `filter` option, but it does a full text search on the options based on a partital value. If the value is preceeded by a `^` then only matches where the keyword is at the start are returned | Object |
| like.[key] | These are the same values as the `filter` option above | String, <br> String Array |
| fields | A list of fields that you want returned. `name` or `altIds.branchNumber` for example.<br>**Note:** the `id` field will always be returned. | String, <br> String Array |

### Example Object

```js
var options = {
  limit: 10,
  offset: 20,
  like: {
    name: "^M"
  },
  filter: {
    facilities: [
      "ATM",
      "DBT",
      "PETROL_FILLING_STATION"
    ],
    type: "extra"
  }
}
```

#### Small Note
The Like and Filter options allow for `AND` and `AND|OR` operations in the API. This has yet to be implemented in this wrapper. Currently the wrapper supports only `AND` statements. For example if you have:

```js
facilities: [
  "ATM",
  "DBT"
]
```

The wrapper will send a request looking for results with ATM **and** DBT. The `AND|OR` feature is on my to-do list.

### Known Facilities
Here is a list of all the known facilities:

| Facility | Description |
| --- | --- |
| 24_HOURS | Open 24 Hours |
| ACCESSIBLE_BABY_CHANGING | Accessible baby changing facilities at the store |
| ACCESSIBLE_CAR_PARKING | Disabled parking facilities |
| ACCESSIBLE_TOILETS | Fully accessible toilets are available at the store |
| AFRO_CARIBBEAN | Afro Caribbean |
| ASIAN | Asian |
| ASSISTANCE_DOGS | Guide dogs are welcome in the store |
| ATM | Cash Machines |
| AUTOMATIC_DOORS | The store has automatic doors |
| BABY_CHANGE | Baby Changing Facilities |
| CAFE | Café |
| CAR_WASH | Car Wash |
| CHICKEN | Chicken |
| CLOTHING_COLLECTION | Clothing collection |
| CLOTHING_ORDER_POINT | Clothing Order Point |
| CLOTHING_RANGE | Clothing Range |
| COINSTAR | Coinstar |
| COMMUNITY_SPACE | Community Space |
| CUMMINS | Cummins |
| DBT | Delivered By Tesco |
| DEPOSIT_MONEY | Deposit Money |
| DIRECT_CLICK_AND_COLLECT | Direct Collection |
| DIRECT_ORDER_POINT | Direct Order Point |
| DIRECT_RETURNS | Direct Returns |
| FISH | Fish |
| FOOD_COLLECTION | Food Collection |
| FREE_FROM | Free from |
| GAMES | Games |
| GREEK | Greek |
| GROCERY_COLLECTION | Grocery Collection |
| HAND_CAR_WASH | Hand car wash |
| HEARING_IMPAIRMENTS | Facilities available for people with hearing impairments |
| INDUCTION_LOOP | Induction loops have been installed at the store |
| INTERCOM | Intercom is available at the store entrance |
| JET_WASH | Jet Wash |
| KRISPY_KREME | Krispy kreme |
| MAX_PRINT_KIOSK | Max Print kiosk |
| MEAT | Meat |
| MOBILITY_IMPAIRMENT | Facilities available for people with mobility impairment |
| MOMENTUM_99 | Momentum 99 |
| MONEYGRAM | MoneyGram |
| NON_ASSISTED_WHEELCHAIR_ACCESS | Non-assisted wheelchair access is possible |
| OPTICIAN | Optician |
| PAYPOINT | PayPoint |
| PAYQWIQ | This store has PayQwiq |
| PETROL_FILLING_STATION | Petrol station |
| PHARMACY | Pharmacy |
| PHOTO_SHOP | Photo Shop |
| PIZZA | Pizza |
| POLISH | Polish |
| POST_OFFICE | Post Office |
| RECYCLING | Recycling |
| RUG_DOCTOR | Rug Doctor |
| SCAN_AS_YOU_SHOP | Scan as you Shop |
| TECH_SUPPORT | Tech Support |
| TESCO_MOBILE_SHOP | Tesco Mobile Shop |
| TIMPSON | Timpson |
| TOILETS | Toilets |
| TRAVEL_MONEY | Travel Money |
| VISUALLY_IMPAIRED | Facilites available for people with visual impairment . Including braille and large print |
| WHEELCHAIR_ACCESS | Wheelchair assistance is available at the store |
| WIFI | WiFi Access |
| WORLD_FOOD | World Food |

This is not the full list, but are all of the ones I have found so far. Apologies for some of the descriptions, these are what were in the dataset from the Tesco API.

Found one I haven't included? Feel free to submit a Pull Request adding it to the table.
Make sure you include the `name` attribute under the *Facility* column, and the `description` attribute under the *Description* column. Also please insert in its correct slot alphabetically.
