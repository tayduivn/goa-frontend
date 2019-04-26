const modelReviews = {
  id: "",
  message: "",
  stars: "",
  user_id: "",
  product_id: "",
  reset: function () {
    this.id = ""
    this.message = ""
    this.stars = ""
    this.user_id = ""
    this.product_id = ""
    return modelReviews
  }
}

export {modelReviews};
