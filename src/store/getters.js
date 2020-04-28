const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  adminInfo: state => state.user.adminInfo
}
export default getters
