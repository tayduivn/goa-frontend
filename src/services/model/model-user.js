const modelUserLogin = {
  email: "",
  password: "",
  type: ""
}

const modelUser = {
  iduser: "",
  name: "",
  password: "",
  email: "",
  street: "",
  phone: "",
  type: "",
  reset: function () {
    this.iduser = ""
    this.name = ""
    this.password = ""
    this.email = ""
    this.street = ""
    this.phone = ""
    this.type = ""
    return modelUser
  }
}

const modelUserTransport = {
  iduser: "",
  name: "",
  password: "",
  email: "",
  street: "",
  phone: "",
  type: "",
  idtransport: "",
  name_truck: "",
  reset: function () {
    this.iduser = ""
    this.name = ""
    this.password = ""
    this.email = ""
    this.street = ""
    this.phone = ""
    this.type = ""
    this.idtransport = ""
    this.name_truck = ""
  }
}

export {modelUser, modelUserLogin, modelUserTransport};
