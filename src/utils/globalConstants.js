
import DeviceInfo from 'react-native-device-info'

export const BaseURLApis = 'https://5dda31555730550014fe75fa.mockapi.io'
export const BaseURL = 'https://5dda31555730550014fe75fa.mockapi.io'
export const RouteKey = {
  ModalDisplay: 'ModalDisplay',
  LibraryDetail: 'LibraryDetail',
  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  Home: 'Home',
  Follow: 'Follow',
  PostDetail: 'PostDetail',
  About: 'About'
}
export const KeyStore = {
  USER_DATA: 'USER_DATA',
  HOME_DATA: 'HOME_DATA',
  INTRODUCE_DATA: 'INTRODUCE_DATA',
  LIBRARY_DATA: 'LIBRARY_DATA',
  LIBRARY_ARTICLES_DATA: 'LIBRARY_ARTICLES_DATA',
  USER_ID: 'USER_ID'
}

export const PRESENTATION_TYPES = {
  Introduction: 'INTRODUCTION',
  Photo: 'PHOTO',
  Album: 'ALBUM',
  Film: 'FILM',
  Calculator: 'CALCULATOR'
}

export const SLIDE_STATUS = {
  OPEN: 'OPEN',
  SAVE: 'SAVE',
  CANCEL: 'CANCEL'
}

export const REGEX_DICEMAL = /[^0-9]/g

export const isTablet = DeviceInfo.isTablet()
