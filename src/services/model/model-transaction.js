const modelTransaction = {
  id: "",
  code: "",
  processor: "Selection",
  processor_trans_id: "",
  cc_num: "",
  cc_type: "",
  start_date: "",
  end_date: "",
  token_stripe: "",
  type_payment: {},
  reset: function () {
    this.id = ""
    this.code = ""
    this.processor = "Selection"
    this.processor_trans_id = ""
    this.cc_num = ""
    this.cc_type = ""
    this.start_date = ""
    this.end_date = ""
    this.token_stripe = ""
    this.type_payment = {}
    return modelTransaction
  }
}

export {modelTransaction};
