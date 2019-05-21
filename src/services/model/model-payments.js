const modelPayment = {
  stripe_secret_token: "",
  stripe_publishable_token: "",
  production_stripe: "",
  paypal_token: "",
  production_paypal: "",
  reset: function () {
    this.stripe_secret_token = ""
    this.stripe_publishable_token = ""
    this.production_stripe = ""
    this.paypal_token = ""
    this.production_paypal = ""
    return modelPayment
  }
}

export {modelPayment};
