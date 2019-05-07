const modelOrder = {
  id: "",
  subtotal: "",
  total: "",
  user_id: "",
  cart_id: "",
  transaction_id: "",
  reset: function () {
    this.id = ""
    this.subtotal = ""
    this.total = ""
    this.user_id = ""
    this.cart_id = ""
    this.transaction_id = ""
    return modelOrder
  }
}

const modelOrderCPanel = {
  order_id: "",
  subtotal: "",
  total: "",
  user_id: "",
  cart_id: "",
  reset: function () {
    this.order_id = ""
    this.subtotal = ""
    this.total = ""
    this.user_id = ""
    this.cart_id = ""
    return modelOrderCPanel
  }
}

export {modelOrder, modelOrderCPanel};
