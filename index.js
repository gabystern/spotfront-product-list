
var targets

$(document).ready(function() {
  parseProducts()
  parseTargets()
})

function parseProducts(){
  $.ajax({
      url: "products.txt",
      success:function(response) {
          let productsArray = response.split(/\r?\n/)
          let sliced = productsArray.slice(1)
          let jsonArray = sliced.map(function(product){
            let prodDetails = product.split('|')
            let sku = prodDetails[0]
            let name = prodDetails[1]
            let desc = prodDetails[2]
            let store_id = "sto"+prodDetails[3]
            let dept_id = "dep"+prodDetails[4]
            let cat_id = "cat"+prodDetails[5]
            let subCat_id = "sub"+prodDetails[6]
            let price = prodDetails[7]
            let prodTargets = []
            targets.forEach(function(target){
              if (target[0] === store_id || target[0] === dept_id || target[0] === cat_id || target[0] === subCat_id ){
                prodTargets.push(target[1])
              }
            })
            let JSONObj = { "sku":sku, "name":name, "description":desc, "priceList":price, "taxonomy":[store_id, dept_id, cat_id, subCat_id], "targetValues": prodTargets};
            return JSON.stringify(JSONObj)
          })
          let targetArray = productsArray.map(function(product){
          })
          document.getElementById("json").innerHTML = jsonArray.map(function(prod){
            return prod+`<br>`
          })
    }
  })
}

function parseTargets(){
  $.ajax({
    url: "targets.txt",
    success: function(response){
      let targetsArray = response.split(/\r?\n/)
      let newArray = targetsArray.map(function(target){
        return target.split(/\s+/)
      })
      targets = newArray
      return targets
    }
  })
}
