const modelPayment = {
  idpayment: "",
  image: "",
  status: "",
  order_idorder: "",
  reset: function () {
    this.idpayment = ""
    this.image = ""
    this.status = ""
    this.order_idorder = ""
    return modelPayment
  }
}

export {modelPayment};
