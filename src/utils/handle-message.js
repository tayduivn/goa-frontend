function successMessage(swal, title = 'Correcto', text = '') {
  swal({
    type: 'success',
    title: title,
    text: text
  });
  console.clear()
}

function errorMessage(swal, error, text = 'Algo salió mal') {
  swal({
    type: 'error',
    title: 'Error',
    text: text
  });
  console.log(error)
}

function infoMessage(swal, error, text = '') {
  swal({
    title: 'Mensaje',
    text: text,
    type: 'info'
  });
  if (error != null)
    console.log(error)
}

function confirmMessage(swal, title = '¿Desea eliminarlo?', text = "No se podrá revertir.") {
  return new Promise((resolve) => {
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((resultado) => {
      if (resultado.value) {
        resolve(true)
      } else if (resultado.dismiss === swal.DismissReason.cancel) {
        resolve(false)
      }
    })
  })
}

export {successMessage, errorMessage, infoMessage, confirmMessage};
