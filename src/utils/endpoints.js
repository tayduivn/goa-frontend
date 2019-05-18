import config from "./../config/config";
import axios from "axios"

function getAxios(endPoint, method, data = null) {
  if (data === null) {
    return axios({
      method: method,
      url: endPoint,
      headers: {
        Authorization: localStorage.token
      },
    })
  } else {
    return axios({
      method: method,
      url: endPoint,
      headers: {
        Authorization: localStorage.token
      },
      data: data
    })
  }
}

const apiUsers = {
  login: `${config.api_url}/api/public/users/login`,
  register: `${config.api_url}/api/public/users/register`,
  forgot: `${config.api_url}/api/public/users/forgot`,
  password: `${config.api_url}/api/users/password`,
  all: `${config.api_url}/api/users`,
}

const apiCategories = {
  all: `${config.api_url}/api/categories`,
  allPublic: `${config.api_url}/api/public/categories`,
}

const apiEmails = {
  all: `${config.api_url}/api/emails`,
  allPublic: `${config.api_url}/api/public/emails`,
}

const apiProductsCategories = {
  all: `${config.api_url}/api/categories/products`,
}

const apiImages = {
  all: `${config.api_url}/api/images`,
  register: `${config.api_url}/api/images/reg`,
  update: `${config.api_url}/api/images/update`,
  allPublic: `${config.api_url}/api/public/images`,
}

const apiReviews = {
  all: `${config.api_url}/api/reviews`,
  allPublic: `${config.api_url}/api/public/reviews`,
}

const apiTransactions = {
  all: `${config.api_url}/api/transactions`,
}

const apiProducts = {
  all: `${config.api_url}/api/products`,
  allPublic: `${config.api_url}/api/public/products`,
}

const apiOrders = {
  all: `${config.api_url}/api/orders`,
}

const apiCarts = {
  all: `${config.api_url}/api/carts`,
}

const apiCartsProducts = {
  all: `${config.api_url}/api/carts/products`,
}

export {
  getAxios,
  apiUsers,
  apiCategories,
  apiImages,
  apiReviews,
  apiTransactions,
  apiCarts,
  apiCartsProducts,
  apiOrders,
  apiProducts,
  apiEmails,
  apiProductsCategories
};
