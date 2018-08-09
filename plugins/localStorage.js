import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({store}) => {
  createPersistedState({
      key: 'pharol',
      storage:  window.sessionStorage 
  })(store)
}
