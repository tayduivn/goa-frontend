const modelCartProducts= {
  id: "",
  quantity: "",
  cart_id: "",
  product_id: "",
  reset: function () {
    this.id = ""
    this.quantity = ""
    this.cart_id = ""
    this.product_id = ""
    return modelCartProducts
  }
}

export {modelCartProducts};
