import Cookies from 'js-cookie'

const AccessTokenKey = 'accessToken'
const RefreshTokenKey = 'refreshToken'
/**
 * 获取访问token
 */
export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}
