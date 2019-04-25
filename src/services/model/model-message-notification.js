const modelMessageNotification = {
  idmessage_notification: "",
  message: "",
  user_iduser: "",
  image: "",
  reset: function () {
    this.idmessage_notification = ""
    this.message = ""
    this.user_iduser = ""
    this.image = ""
    return modelMessageNotification
  }
}

export {modelMessageNotification};
