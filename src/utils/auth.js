import Cookies from 'js-cookie'

const TokenKey = 'lt'

export function getToken() {
  return Cookies.get(TokenKey)
  // return "0934e4aa1dcf462a8dea8098dbe6bdde"
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove('JSESSIONID')
  return Cookies.remove(TokenKey)
}
