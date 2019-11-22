import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, View
} from 'react-native'
// import PropTypes from 'prop-types'

@observer
class Detail extends React.PureComponent {
  render () {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

export default Detail

Detail.defaultProps = {
}
Detail.propTypes = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})
