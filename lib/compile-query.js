module.exports = (uri, options) => {
  let qs = []
  if (uri.indexOf("grocery/products") !== -1) {
    // Grocery Search
    qs.push("limit=" + (options.limit || 10))
    qs.push("offset=" + (options.offset || 0))

    if (typeof options.query != "undefined") {
      qs.push("query=" + options.query)
    }

  } else if (uri.indexOf("product") !== -1) {
    // Product Data
    let applicable = ["gtin", "tpnb", "tpnc", "catid"]

    for (let i in options) {
      if (options.hasOwnProperty(i)) {
        if (applicable.indexOf(i.toLowerCase()) !== -1) {
          if (Array.isArray(options[i])) {
            options[i].forEach((number) => {
              qs.push(i + "=" + number)
            })
          } else {
            qs.push(i + "=" + options[i])
          }
        }
      }
    }

  } else if (uri.indexOf("locations/search") !== -1) {
    // Store Locations
    qs.push("limit=" + (options.limit || 10))
    qs.push("offset=" + (options.offset || 0))

    if(typeof options.sort != "undefined"){
      qs.push("sort=near:\"" + options.sort.near + "\"")
    }

    if(typeof options.filter != "undefined"){
      qs.push("filter=" + paramIterator(options.filter).join(" AND "))
    }

    if(typeof options.like != "undefined"){
      qs.push("like=" + paramIterator(options.like).join(" AND "))
    }

    if(typeof options.fields != "undefined"){
      qs.push("fields=" + Array.isArray(options.fields) ? options.fields.join(",") : options.fields)
    }

  } else {
    throw new Error("Could not identify API endpoint")
  }

  return uri + (qs.length ? "?" + qs.join("&") : "")
}

function paramIterator(param){
  let arr = []

  for(let i in param){
    if(param.hasOwnProperty(i)){
      if(Array.isArray(param[i])){
        for(var k in param[i]){
          arr.push(i + ":" + param[i][k])
        }
      } else {
        arr.push(i + ":" + param[i])
      }
    }
  }

  return arr
}
