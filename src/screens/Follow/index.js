import React from 'react'
import {
  View, FlatList, Text, Image,
  StyleSheet, Animated, StatusBar,
  Platform, RefreshControl, TouchableOpacity
} from 'react-native'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import NaviStore from 'mobxStore/NaviStore'
import UserStore from 'mobxStore/UserStore'
import { IcEdit } from 'utils/globalIcons'
import Images from 'assets/Images'
import { height } from 'utils/globalStyles'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const AVATAR_HEIGHT = 80
const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 133
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

@observer
class AnimatedHeader extends React.Component {
state = {
  scrollY: new Animated.Value(
    // iOS has negative initial scroll value because content inset...
    Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
  ),
  refreshing: false
};

componentDidMount () {
  this._navListener = this.props.navigation.addListener('didFocus', () => {
    StatusBar.setBarStyle('light-content')
  })
}

componentWillUnmount () {
  this._navListener.remove()
}

  _renderItem = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <View style={[styles.hearderItem]}>
          <Image source={Images.imgTemp} style={styles.iconAva} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>{'Anonymous'}</Text>
            {/* <Text style={{ fontSize: 12, fontWeight: '100', marginTop: 5 }}>{Moment(item.PostedAt * 1000).fromNow()}</Text> */}
            <Text style={{ fontSize: 12, fontWeight: '100', marginTop: 5 }}>{'2 day ago'}</Text>
          </View>
        </View>
        <Text style={styles.txtDescription}>{'I used to be so beautiful now look at me...'}</Text>
        <Image source={Images.imgTemp} style={{ width: '100%', height: height(25), alignSelf: 'center' }} resizeMode={'center'}/>
        <View style={styles.footerItem}>
          <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icLoveOn } style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{'10'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icComment} style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{'6'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flex: 5, alignItems: 'flex-end', marginRight: 15 }}>
            <Image source={Images.icMore} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
    )
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp'
    })
    const avatarScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.6],
      extrapolate: 'clamp'
    })
    const marginLeftName = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -15, -20],
      extrapolate: 'clamp'
    })
    const marginTop = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 13],
      extrapolate: 'clamp'
    })
    const marginBottom = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 25],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.fill}>
        <AnimatedFlatList
          contentContainerStyle={{ paddingTop: Platform.OS === 'ios' ? 0 : HEADER_MAX_HEIGHT }}
          style={styles.fill}
          scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: true, // <-- Add this
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y
                console.log('offsetY: ', offsetY)
              }
            }
          )}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(_, i) => i.toString()}
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true })
                const self = this
                setTimeout(() => self.setState({ refreshing: false }), 1200)
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
        />
        {/* Header */}
        <Animated.View
        // pointerEvents="none"
          style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
          {/* Image header */}
          <Animated.Image
            pointerEvents="none"
            style={[
              styles.imgHeader
            ]}
            source={require('./assets/ruong.jpg')}
          />
          {/* Avatar */}
          <AnimatedTouchableOpacity
            style={[
              styles.viewAvatar
            ]}
            activeOpacity={1}
          >
            { UserStore.avatar
              ? <Animated.Image
                pointerEvents="none"
                style={[styles.avatar,
                  {
                    transform: [
                      { scale: avatarScale },
                      { translateY: marginBottom }
                    ]
                  }]}
                source={{ uri: UserStore.avatar }}
              />
              : <Animated.Image
                pointerEvents="none"
                style={[styles.avatar,
                  {
                    transform: [
                      { scale: avatarScale },
                      { translateY: marginBottom }
                    ]
                  }]}
                source={require('./assets/avata.jpg')}
              />}
            <View>
              <Animated.Text
                style={[styles.name,
                  {
                    transform: [
                      { translateY: marginTop },
                      { translateX: marginLeftName }
                    ]
                  }]}>{UserStore.name}</Animated.Text>
              <Animated.Text
                numberOfLines={2}
                style={[styles.bio,
                  {
                    transform: [
                      { translateY: marginTop },
                      { translateX: marginLeftName }
                    ]
                  }]}>{UserStore.bio}</Animated.Text>
            </View>
          </AnimatedTouchableOpacity>
        </Animated.View>
        {/* bar */}
        <Animated.View
          style={[
            styles.bar
          ]}
        >
          <View/>
          <TouchableOpacity style={styles.btnEdit} onPress={() => NaviStore.pushToScreen('EditProfile')}>
            <IcEdit size={24}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default AnimatedHeader

AnimatedHeader.defaultProps = {
  pop: () => {}
}

AnimatedHeader.propTypes = {
  pop: PropTypes.func
}
const styles = StyleSheet.create({
  itemView: {
    marginVertical: 5,
    backgroundColor: 'white'
    // borderRadius: 5
  },
  btnEdit: {
    marginRight: 15,
    marginTop: 25
  },
  bar: {
    marginTop: 38,
    height: 82,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fill: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT
  },
  imgHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    zIndex: 1,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  bio: {
    color: 'white',
    fontSize: 10,
    marginLeft: 10
  },
  name: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  viewAvatar: {
    backgroundColor: 'transparent',
    height: AVATAR_HEIGHT,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    width: '85%'
  },
  avatar: {
    height: AVATAR_HEIGHT,
    width: AVATAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AVATAR_HEIGHT / 2,
    resizeMode: 'cover'
  },
  iconAva: {
    width: 44,
    height: 44,
    margin: 10,
    borderRadius: 22
  },
  hearderItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    overflow: 'hidden'
  },
  icon: {
    width: 22,
    height: 22
  },
  txtDescription: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
