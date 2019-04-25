const apiUsers = {
  login: '/api/public/users/login',
  register: '/api/public/users/register',
  forgot: '/api/public/users/forgot',
  password: '/api/users/password',
  all: '/api/users',
}

const apiCategories = {
  all: '/api/categories',
  allPublic: '/api/public/categories',
}

const apiImages = {
  all: '/api/images',
  register: '/api/images/register',
  update: '/api/images/update',
  allPublic: '/api/public/images',
}

const apiReviews = {
  all: '/api/reviews',
  allPublic: '/api/public/reviews',
}

const apiTransactions = {
  all: '/api/transactions',
}

const apiProducts = {
  all: '/api/products',
}

const apiOrders = {
  all: '/api/orders',
}

const apiCarts = {
  all: '/api/carts',
}

export {apiUsers, apiCategories, apiImages, apiReviews, apiTransactions, apiCarts, apiOrders, apiProducts};
