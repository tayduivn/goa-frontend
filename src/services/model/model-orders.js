const modelOrder = {
  idorder: "",
  origin_order: "",
  destination_order: "",
  maximum_delivery_date: "",
  maximum_withdrawal_date: "",
  message: "",
  price: "",
  status: "",
  user_iduser: "",
  reset: function () {
    this.idorder = ""
    this.origin_order = ""
    this.destination_order = ""
    this.maximum_delivery_date = ""
    this.maximum_withdrawal_date = ""
    this.message = ""
    this.price = ""
    this.status = ""
    this.user_iduser = ""
    return modelOrder
  }
}

export {modelOrder};
