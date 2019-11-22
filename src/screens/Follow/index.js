import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View
} from 'react-native'
// import PropTypes from 'prop-types'

@observer
class Follow extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

export default Follow

Follow.defaultProps = {
}
Follow.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
})
