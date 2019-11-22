import { observable, action } from 'mobx'
import ServerApis from 'mobxStore/api'
import AppStore from 'mobxStore/AppStore'
import AsyncStore from 'react-native-simple-store'
import { KeyStore, BaseURL } from 'utils/globalConstants'

class Home {
  @observable isLoading = false
  @observable logoHome = ''
  @observable backgroundHome = ''
  @observable copyright = '© Copyright 2019. Generali Vietnam Life Insurance Ltd'

  @observable primaryMenu = null

  @observable rightMenu = null

  @observable leftMenu = null

  @observable logoPresentation = ''
  @observable presentation = null

  @action getHomeData = async () => {
    try {
      this.isLoading = true
      const response = null

      // if (AppStore.isOnline) {
      //   response = await ServerApis.getHomeData()
      // } else {
      //   response = await AsyncStore.get(KeyStore.HOME_DATA) || null
      // }

      // console.log('Data log: ', response)

      // if (response && response.status === 200) {
      //   if (response.data.errors) {
      //     return false
      //   } else {
      //     AsyncStore.save(KeyStore.HOME_DATA, response)
      //     const data = response.data.data
      //     this.logoHome = `${BaseURL}${data.logoHome}`.toLowerCase()
      //     this.backgroundHome = `${BaseURL}${data.backgroundHome}`
      //     this.copyright = `${data.copyright}`
      //     this.logoPresentation = `${BaseURL}${data.logoPresentation}`
      //     this.primaryMenu = data.primaryMenu
      //     this.rightMenu = data.rightMenu
      //     this.leftMenu = data.leftMenu
      //     this.presentation = data.presentation
      //   }
      // } else {
      //   alert('Connect server error!')
      //   return false
      // }
      this.isLoading = false
      return true
    } catch (error) {
      this.isLoading = false
      console.log('Error: ', error)
      return false
    }
  }
}
const HomeStore = new Home()
export default HomeStore
