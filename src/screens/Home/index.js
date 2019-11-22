import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types'
import { THEME_DEFAULT, FONT, width, height } from 'utils/globalStyles'
import HomeStore from 'mobxStore/HomeStore'

import { IcHome } from 'utils/globalIcons'

@observer
class Home extends React.PureComponent {
  render () {
    const { gotoTab } = this.props
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <IcHome/>
      </SafeAreaView>
    )
  }
}

export default Home

Home.defaultProps = {
  gotoTab: () => {}
}
Home.propTypes = {
  gotoTab: PropTypes.func
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    backgroundColor: 'gray'
  }
})
