const modelUserLogin = {
  email: "",
  password: "",
  type: ""
}

const modelUser = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  address: "",
  phone: "",
  role_id: "",
  reset: function () {
    this.id = ""
    this.email = ""
    this.first_name = ""
    this.last_name = ""
    this.password = ""
    this.address = ""
    this.phone = ""
    this.role_id = ""
    return modelUser
  }
}

export {modelUser, modelUserLogin};
