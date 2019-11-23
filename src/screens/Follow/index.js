import React from 'react'
import {
  View, FlatList, Text,
  StyleSheet, Animated, StatusBar,
  Platform, RefreshControl, TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
// import NaviStore from 'mobxStore/NaviStore'
import UserStore from 'mobxStore/UserStore'
import Messages from 'utils/globalMessages'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const AVATAR_HEIGHT = 80
const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 133
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class AnimatedHeader extends React.Component {
state = {
  scrollY: new Animated.Value(
    // iOS has negative initial scroll value because content inset...
    Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
  ),
  refreshing: false
};

  _renderItem = ({ item }) => {
    return (
      <View style={styles.nonsenseItem}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    )
  }

  selectActionSheet = (i) => {
    console.log('selectActionSheet: ', i)
    if (i === 1) {
      this.pickSingleWithCamera()
    } else if (i === 2) {
      this.onOpenPickerImage()
    }
  }

  onOpenPickerImage = () => {
    console.log('onOpenPickerImage')
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        waitAnimationEnd: false,
        includeExif: true,
        multiple: false
      }).then(image => {
        console.log('images: ', image)
        // if (pickImageIndex === PICK_IMAGES_INDEX[1]) {
        //   this.props.uploadWallImage(user._id, image, 1, tokenData.token)
        // } else {
        //   this.props.uploadWallImage(user._id, image, 2, tokenData.token)
        // }
      }).catch(e => console.log('pickSingleWithCamera', e))
    } catch (error) {
      console.log('onOpenPickerImage: ', error)
    }
  }

  pickSingleWithCamera = () => {
    try {
      console.log('pickSingleWithCamera')
      ImagePicker.openCamera({
        width: width(100), height: height(100)
      }).then(image => {
        console.log('images: ', image)
        // if (pickImageIndex === PICK_IMAGES_INDEX[1]) {
        //   this.props.uploadWallImage(user._id, image, 1, tokenData.token)
        // } else {
        //   this.props.uploadWallImage(user._id, image, 2, tokenData.token)
        // }
      }).catch(e => console.log('pickSingleWithCamera1!', e))
    } catch (error) {
      console.log('pickSingleWithCamera2', error)
    }
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
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor='rgba(0, 0, 0, 0.251)'
        />
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
            onPress={() => {
              console.log('press')
              this.ActionSheet.show()
            }}
          >
            <Animated.Image
              pointerEvents="none"
              style={[styles.avatar,
                {
                  transform: [
                    { scale: avatarScale },
                    { translateY: marginBottom }
                    // { translateX: marginLeft }
                  ]

                }]}
              source={require('./assets/avata.jpg')}
            />
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
        <ActionSheet
          ref={o => { this.ActionSheet = o }}
          title={Messages.cameraTitle}
          options={[Messages.cancel, Messages.cameraCapture, Messages.cameraGallery]}
          cancelButtonIndex={0}
          onPress={(e) => this.selectActionSheet(e)}
        />
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
  fill: {
    flex: 1
  },
  nonsenseItem: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    margin: 8,
    borderRadius: 10,
    padding: 10
  },
  itemText: {
    fontSize: 40,
    padding: 20,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10
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
  }
})
