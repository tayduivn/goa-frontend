const modelObject = {
  idobject: "",
  name_object: "",
  image: "",
  height: "",
  width: "",
  weight: "",
  quantity: "",
  service_idservice: "",
  reset: function () {
    this.idobject = ""
    this.name_object = ""
    this.image = ""
    this.height = ""
    this.width = ""
    this.weight = ""
    this.quantity = ""
    this.service_idservice = ""
    return modelObject
  }
}

export {modelObject};
