const modelCart= {
  id: "",
  user_id: "",
  status: "",
  reset: function () {
    this.id = ""
    this.user_id = ""
    this.status = ""
    return modelCart
  }
}

export {modelCart};
