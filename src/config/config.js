'use strict'

/*const apiUrl = 'http://goa-backend'*/
const socketUrl = 'http://127.0.0.1:3120'
/*const socketUrl = 'ws://127.0.0.1:3120'*/
const apiUrl = 'http://backend.gardensofamerica.com'
const config = {
  socket_url: socketUrl,
  api_url: apiUrl,
  notification: {
    position: 'top center',
    showDuration: 2000
  },
  expressionRegular: {
    // eslint-disable-next-line
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    // eslint-disable-next-line
    number: /^([0-9])*$/,
    // eslint-disable-next-line
    text: /^[a-zA-Z\s]*$/,
    // eslint-disable-next-line
    url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
  }
}

export default config
