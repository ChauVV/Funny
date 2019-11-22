import { get, post, put } from './baseApi'
import UserStore from 'mobxStore/UserStore'
import { BaseURLApis } from 'utils/globalConstants'

export default class ServerApi {
  /** ------------------------------------------*
  * Group Code: Home APIs
  * ------------------------------------------- */
  static getHomeData = () => {
    const url = BaseURLApis + '/gencareer-api/service/gencareer/v1/home'
    const header = {
      'user-id': `${UserStore.userId}`
    }
    console.log('getHomeData...,', UserStore.userId, url)
    return get(url, header)
  }

  /** ------------------------------------------*
  * Group Code: Library APIs
  * Owner: Jeremy
  * ------------------------------------------- */
  static getListCategory = () => {
    const url = BaseURLApis + '/gencareer-api/service/gencareer/v1/categories'
    const header = {
      'user-id': `${UserStore.userId}`
    }
    console.log('getListCategory...,', UserStore.userId, url)
    return get(url, header)
  }

  static getArticlesDetail = (id) => {
    const url = BaseURLApis + `/gencareer-api/service/gencareer/v1/articles/${id}`
    const header = {
      'user-id': `${UserStore.userId}`
    }
    console.log('getArticlesDetail...,', UserStore.userId, url)
    return get(url, header)
  }

  static getArticlesbyCategoryId = (id, page = 1) => {
    const url = BaseURLApis + `/gencareer-api/service/gencareer/v1/categories/${id}/articles?page=${page}`
    const header = {
      'user-id': `${UserStore.userId}`
    }
    console.log('getArticlesbyCategoryId...,', UserStore.userId, url)
    return get(url, header)
  }

  /** ------------------------------------------*
  * Group Code: Authen
  * ------------------------------------------- */
  static login = (username, password) => {
    const url = BaseURLApis + '/gencareer-api/service/gencareer/v1/users/login'
    const header = {}
    console.log('login with: ', username, password, url)
    const data = { username, password }
    return post(url, data, header)
  }

  static uploadAvatar = (payload) => {
    const { id, image, token } = payload
    const url = BaseURL + `/users/${id}/avatar`
    const header = {
      Authorization: Bearer + token
    }

    const formData = new FormData()

    // if (isIphoneX) {
    //   formData.append('file', {
    //     uri: image.uri,
    //     type: image.type,
    //     name: image.fileName
    //   })
    // } else {
    var uri = image.path
    var urlsplit = uri.split('/')

    var lastPath = urlsplit[urlsplit.length - 1]
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: lastPath
    })
    // }

    const data = formData
    console.log('uploadAvatar...: ', url)
    return put(url, data, header)
  }

  /** ------------------------------------------*
  * Group Code: Introduce
  * ------------------------------------------- */
 static getIntroducePage = () => {
   const url = BaseURLApis + '/gencareer-api/service/gencareer/v1/introduce'
   const header = {
     'user-id': `${UserStore.userId}`
   }
   console.log('getIntroducePage: ', UserStore.userId, url)
   return get(url, header)
 }

 static updateLeftMenu = (introduceItems) => {
   const url = BaseURLApis + '/gencareer-api/service/gencareer/v1/introduce/left-menu'
   const header = {
     'user-id': `${UserStore.userId}`
   }
   console.log('updateLeftMenu: ', introduceItems, url)
   const data = { introduceItems }
   return post(url, data, header)
 }
}
