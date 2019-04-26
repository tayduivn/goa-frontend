const modelTransaction = {
  id: "",
  code: "",
  processor: "",
  processor_trans_id: "",
  cc_num: "",
  cc_type: "",
  start_date: "",
  end_date: "",
  order_id: "",
  reset: function () {
    this.id = ""
    this.code = ""
    this.processor = ""
    this.processor_trans_id = ""
    this.cc_num = ""
    this.cc_type = ""
    this.start_date = ""
    this.end_date = ""
    this.order_id = ""
    return modelTransaction
  }
}

export {modelTransaction};
