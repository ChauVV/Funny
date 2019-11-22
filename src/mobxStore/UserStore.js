import { observable, action } from 'mobx'
import AsyncStore from 'react-native-simple-store'
// import ServerApis from 'mobxStore/api'
// import JWT from 'react-native-pure-jwt'
import NaviStore from 'mobxStore/NaviStore'
// import HomeStore from 'mobxStore/HomeStore'
import { RouteKey, KeyStore } from 'utils/globalConstants'

// const pvk = 'GQDstcKsx1KHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk'

class User {
  @observable userId = ''
  @observable name = 'John'
  @observable isLoging = false

  @action getLogin = async () => {
    const UserId = await AsyncStore.get(KeyStore.USER_ID)
    console.log('UserId: ', UserId)
    this.userId = UserId
    if (UserId && UserId.length > 0) {
      return true
    }
    return false
  }

  @action logout = () => {
    AsyncStore.save(KeyStore.USER_ID, null)
    AsyncStore.save(KeyStore.HOME_DATA, null)
    NaviStore.pushToLogin()
  }

  @action login = async (name) => {
    try {
      this.isLoging = true
      // const response = await ServerApis.login(username, password)
      // console.log('response: ', response)
      // if (response && response.status === 200) {
      //   if (response.data.error) {
      //     alert(response.data.error.message)
      //   } else {
      //     const data = response.data.data
      //     const token = data.token
      //     if (token) {
      //       var decoded = await JWT.decode(token, pvk, { skipValidation: true })
      //       if (decoded) {
      //         const payload = decoded.payload

      //         this.userId = payload.UserId
      //         console.log('UserId: ', this.userId)
      //         AsyncStore.save(KeyStore.USER_ID, this.userId)
      //         const isOK = await HomeStore.getHomeData()
      //         if (isOK) {
      //           NaviStore.pushToScreen(RouteKey.LoggedIn)
      //         }
      //       }
      //     }
      //   }
      // } else {
      //   alert('Connect server error!')
      // }
      this.name = name.length > 0 ? name : 'Anonymous'
      this.userId = 'Anonymous'
      console.log('UserId: ', this.userId)
      AsyncStore.save(KeyStore.USER_ID, this.userId)

      this.isLoging = false
      NaviStore.pushToScreen(RouteKey.LoggedIn)
    } catch (error) {
      alert('Connect server error!')
      console.log('login: ', error)
      this.isLoging = false
    }
  }
}
const UserStore = new User()
export default UserStore
