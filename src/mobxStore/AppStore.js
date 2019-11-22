import { observable, action } from 'mobx'

class App {
  @observable isOnline = true

  @action updateInternet = (isOnline) => {
    this.isOnline = isOnline
  }
}
const AppStore = new App()
export default AppStore
