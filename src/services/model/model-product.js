const modelProduct = {
  id: "",
  sku: "",
  name: "",
  description_short: "",
  description_one: "",
  description_two: "",
  preparation: "",
  quantity: "",
  nutrition: "",
  user_id: "",
  reset: function () {
    this.id = ""
    this.sku = ""
    this.name = ""
    this.description_short = ""
    this.description_one = ""
    this.description_two = ""
    this.preparation = ""
    this.regular_price = ""
    this.quantity = ""
    this.nutrition = ""
    this.user_id = ""
    return modelProduct
  }
}

export {modelProduct};
