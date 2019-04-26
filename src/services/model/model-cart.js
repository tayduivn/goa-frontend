const modelCart= {
  id: "",
  price: "",
  quantity: "",
  user_id: "",
  product_id: "",
  reset: function () {
    this.id = ""
    this.price = ""
    this.quantity = ""
    this.user_id = ""
    this.product_id = ""
    return modelCart
  }
}

export {modelCart};
