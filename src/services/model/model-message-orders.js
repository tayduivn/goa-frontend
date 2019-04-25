const modelMessageOrders = {
  idmessage_order: "",
  date_withdrawal: "",
  date_delivery: "",
  id_client: "",
  order_idorder: "",
  user_iduser: "",
  transport_idtransport: "",
  reset: function () {
    this.idmessage_order = ""
    this.date_withdrawal = ""
    this.date_delivery = ""
    this.id_client = ""
    this.order_idorder = ""
    this.user_iduser = ""
    this.transport_idtransport = ""
    return modelMessageOrders
  }
}

export {modelMessageOrders};
