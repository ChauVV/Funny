
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View, Text
} from 'react-native'
import { observer } from 'mobx-react'
import { THEME_DEFAULT, height, width } from 'utils/globalStyles'
import AppStore from 'mobxStore/AppStore'
// import PropTypes from 'prop-types'

@observer
class GlobalView extends PureComponent {
  render () {
    return (
      <View style={styles.container}
        pointerEvents="box-none"
      >
        {!AppStore.isOnline &&
          <View style={styles.internet} pointerEvents="box-none">
            <View style={styles.internetDot}/>
            <Text style={styles.overlayText}>OFFLINE</Text>
          </View>
        }
      </View >
    )
  }
}

export default GlobalView

GlobalView.defaultProps = {
}

GlobalView.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  internet: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: height(5),
    left: width(2),
    paddingHorizontal: height(2),
    paddingVertical: height(1),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: height(2)
  },
  internetDot: {
    backgroundColor: THEME_DEFAULT.colorDanger,
    width: height(2),
    height: height(2),
    borderRadius: height(1),
    marginRight: height(1)
  },
  overlayText: {
    color: THEME_DEFAULT.colorPrimary,
    fontFamily: THEME_DEFAULT.fontGame,
    fontSize: height(2),
    marginBottom: 0
  }
})
