const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  isAdmin: state => state.user.isAdmin,
  adminInfo: state => state.user.adminInfo
}
export default getters
