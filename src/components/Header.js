import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Text

} from 'react-native'

export default class Header extends Component {
  renderIconLeft () {
    const iconLeftStyle = this.props.iconLeftStyle || {}
    if (this.props.iconLeft) {
      return (
        <Image source={this.props.iconLeft} style={[styles.iconLeft, iconLeftStyle]} resizeMode={'stretch'}/>
      )
    } else {
      return null
    }
  }

  renderIconRight () {
    const iconRightStyle = this.props.iconRightStyle || {}
    if (this.props.iconRight) {
      return (
        <Image source={this.props.iconRight} style={[styles.iconRight, iconRightStyle]}/>
      )
    } else {
      return null
    }
  }

  renderTextRight () {
    const iconRightStyle = this.props.iconTextStyle || {}
    if (this.props.textRight) {
      return (
        <Text style={[styles.iconTextRight, iconRightStyle]} >{ this.props.textRight}</Text>
      )
    } else {
      return null
    }
  }

  renderTextLeft () {
    const iconRightStyle = this.props.iconTextStyle || {}
    if (this.props.textLeft) {
      return (
        <Text style={[styles.iconTextRight, iconRightStyle]} >{ this.props.textLeft}</Text>
      )
    } else {
      return null
    }
  }

  onPressLeft () {
    if (this.props.onPressLeft) {
      this.props.onPressLeft()
    }
  }

  onPressRight () {
    if (this.props.onPressRight) {
      this.props.onPressRight()
    }
  }

  render () {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text style={[styles.title, this.props.titleStyle]}>
              {this.props.title}
            </Text>
          </View>
        </View>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => this.onPressLeft()}
            style={{ borderWidth: 0 }}>
            <View style={styles.leftContainer}>
              {this.props.headertext ? this.renderTextLeft() : this.renderIconLeft()}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() => this.onPressRight()}
            style={{ borderWidth: 0 }}>
            <View style={styles.rightContainer}>
              { this.props.headertext ? this.renderTextRight() : this.renderIconRight()}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    height: 54
  },
  content: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e2e1'
  },
  title: {
    fontSize: 16,
    color: '#2A2A2A'
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 84,
    height: 54
  },
  leftContainer: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  iconLeft: {
    height: 24,
    width: 24
    // borderWidth: 1,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 74,
    height: 54
  },
  rightContainer: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  iconRight: {
    height: 24,
    width: 24
  }
}
