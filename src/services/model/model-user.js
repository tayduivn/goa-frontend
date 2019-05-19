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
  city: "",
  state: "",
  country: "",
  country_code: "",
  postal_code: "",
  role_id: "",
  reset: function () {
    this.id = ""
    this.email = ""
    this.first_name = ""
    this.last_name = ""
    this.password = ""
    this.address = ""
    this.phone = ""
    this.city = ""
    this.state = ""
    this.country = ""
    this.country_code = ""
    this.postal_code = ""
    this.role_id = ""
    return modelUser
  }
}

export {modelUser, modelUserLogin};
