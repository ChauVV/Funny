import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity,
  Image, StyleSheet
} from 'react-native'
import NaviStore from 'mobxStore/NaviStore'

// import { THEME_DEFAULT } from 'utils/globalStyles'

import Images from 'assets/Images'

import Onboarding from 'react-native-onboarding-swiper'

const Square = ({ isLight, selected }) => {
  let backgroundColor
  if (isLight) {
    backgroundColor = selected ? 'purple' : 'rgba(0, 0, 0, 0.3)'
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)'
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  )
}

class OnBoardScreen extends Component {
  onPressLogin = () => {
    NaviStore.pushToLogin()
  }

  renderDoneButton () {
    return (
      <View style={{ alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          color: 'purple',
          marginBottom: 30
        }}>You are anonymous!</Text>
        <TouchableOpacity
          onPress={this.onPressLogin}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'purple'
          }}>
          <Image source={Images.ic_arrow_next_right} style={{ width: 12, height: 12 }} resizeMode={'contain'} />
        </TouchableOpacity>
      </View>
    )
  }

  renderTitle (text, color = 'red') {
    return (
      <View style={{ alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
        <Text style={{ textAlign: 'center', fontSize: 30, color: color, fontWeight: 'bold' }}>{text.toUpperCase()}</Text>
      </View>
    )
  }

  renderSubtitle (text, color = 'red') {
    return (
      <View style={{ alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
        <Text style={{ textAlign: 'center', fontSize: 16, color: color }}>{text}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Onboarding
          bottomBarHighlight={false}
          DotComponent={Square}
          skipLabel = {''}
          nextLabel={''}
          showDone={false}
          onSkip={() => {}}
          onDone={() => {}}
          pages={[
            {
              backgroundColor: 'purple',
              image: <Image source={Images.intro2} resizeMode={'contain'} style={styles.image} />,
              title: this.renderTitle('Do you try it?', 'yellow'),
              subtitle: this.renderSubtitle('Connect, Interact with other Mantu members', 'white')
            },
            {
              backgroundColor: 'rgb(48, 189, 184)',
              image: <Image source={Images.speak3} resizeMode={'contain'} style={styles.image1}/>,
              title: this.renderTitle('Say it'),
              subtitle: this.renderSubtitle('Speak out what you are still afraid', 'purple')
            },
            {
              backgroundColor: 'white',
              title: this.renderTitle('Special'),
              image: <Image source={Images.speak1} resizeMode={'contain'} style={styles.image1}/>,
              subtitle: this.renderDoneButton()
            }
          ]}
        />
      </View>
    )
  }
}
export default OnBoardScreen
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 359,
    height: 230
  },
  image1: {
    width: 300,
    height: 220
  }
})
