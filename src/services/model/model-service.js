const modelService = {
  idservice: "",
  name: "",
  image: "",
  category_idcategory: "",
  reset: function () {
    this.idservice = ""
    this.name = ""
    this.image = ""
    this.category_idcategory = ""
    return modelService
  }
}

export {modelService};
