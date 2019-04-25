const modelTransportService = {
  idtransport_service: "",
  name_service: "",
  size: "",
  distance: "",
  weight: "",
  prom_price: "",
  transport_idtransport: "",
  reset: function () {
    this.idtransport_service = ""
    this.name_service = ""
    this.size = ""
    this.distance = ""
    this.weight = ""
    this.prom_price = ""
    this.transport_idtransport = ""
    return modelTransportService
  }
}

export {modelTransportService};
