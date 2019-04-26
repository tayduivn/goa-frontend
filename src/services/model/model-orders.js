const modelOrder = {
  id: "",
  subtotal: "",
  total: "",
  user_id: "",
  cart_id: "",
  reset: function () {
    this.id = ""
    this.subtotal = ""
    this.total = ""
    this.user_id = ""
    this.cart_id = ""
    return modelOrder
  }
}

export {modelOrder};
