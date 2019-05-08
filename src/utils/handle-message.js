function successMessage(swal, title = 'Success', text = '') {
  swal({
    type: 'success',
    title: title,
    text: text
  });
  console.clear()
}

function errorMessage(swal, error, text = 'Something went wrong') {
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

function confirmMessage(swal, title = 'You desire delete it?', text = "You can't revert it") {
  return new Promise((resolve) => {
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not',
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
