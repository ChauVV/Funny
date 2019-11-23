import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Home from 'screens/Home'
import Register from 'screens/Register'
import Follow from 'screens/Follow'
import PostDetail from 'screens/PostDetail'
import NewsFeedScreen from 'screens/Home/NewsFeedScreen'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import OnBoard from 'screens/OnBoardScreen'

import GlobalView from 'components/GlobalView'

import NetInfo from '@react-native-community/netinfo'

import UserStore from 'mobxStore/UserStore'
import HomeStore from 'mobxStore/HomeStore'
import NaviStore from 'mobxStore/NaviStore'
import AppStore from 'mobxStore/AppStore'

import { RouteKey } from 'utils/globalConstants'
import { THEME_DEFAULT } from 'utils/globalStyles'

/** ------------------------------------------*
* Activities:
* 1. BackHandler
* 2. checkUpdate
* 3. configPushNotification
* 4. AppState (background, inactive, active)
* ------------------------------------------- */

/** ------------------------------------------*
* Group Code: Debug
* ------------------------------------------- */
console.disableYellowBox = true

/** ------------------------------------------*
* Group Code: Navigation
* ------------------------------------------- */

const MainTabbar = createBottomTabNavigator(
  {
    Home: Home,
    Follow: Follow
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName = ''
        if (routeName === RouteKey.Home) {
          iconName = 'medium'
        } else {
          iconName = 'heart'
        }

        return <IconFontAwesome
          name={iconName}
          style={{ color: focused ? THEME_DEFAULT.colorBackground : '#7e7e7e', fontSize: 20 }}
        />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showLabel: false,
      showIcon: true
    }
  }
)

const MainStack = createStackNavigator(
  {
    MainTabbar: MainTabbar,
    PostDetail: PostDetail,
    NewsFeedScreen: NewsFeedScreen
  }, {
    headerMode: 'none',
    mode: 'modal'
  }
)
const SwitchNavigator = (isLogin) => createSwitchNavigator(
  {
    OnBoard: OnBoard,
    LoggedOut: {
      screen: Register
    },
    LoggedIn: {
      screen: MainStack
    }
  },
  {
    initialRouteName: isLogin ? 'LoggedIn' : 'OnBoard'
  }
)
const getRootNavigation = (isLogin) => SwitchNavigator(isLogin)
// import PropTypes from 'prop-types'
@observer
class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = ({
      isLogin: false,
      isLoading: true
    })

    NetInfo.isConnected.addEventListener('connectionChange', (internet) => AppStore.updateInternet(internet))
  }

  async componentDidMount () {
    const isLogin = await UserStore.getLogin()
    if (isLogin) {
      await HomeStore.getHomeData()
    }
    this.setState({ isLogin, isLoading: false })
    SplashScreen.hide()
  }

  render () {
    const RootNavigator = getRootNavigation(this.state.isLogin)
    return (
      <View style={styles.container}>
        {
          this.state.isLoading
            ? <View/>
            : <View style={styles.container}>
              <RootNavigator
                onNavigationStateChange={(prev, next) => NaviStore.onNavigationStateChange(prev, next)}
                // eslint-disable-next-line no-return-assign
                ref={nav => NaviStore.navigator = nav}
              />
              <GlobalView/>
            </View>
        }
      </View>

    )
  }
}
export default App

App.defaultProps = {
}
App.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
