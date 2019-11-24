/*
 * Created by Jeremy on Fri Jun 15 2018
 *
 * Copyright (c) 2018 Jeremy
 */
import React, { PureComponent } from 'react'

import {
  View, Dimensions, SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Images from 'assets/Images'
import NaviStore from 'mobxStore/NaviStore'

const { width } = Dimensions.get('window')

class EditProfile extends PureComponent {
  render () {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={'Edit Profile'}
          onPressLeft={() => NaviStore.goBack()}
          iconLeft={Images.icClose}
          iconLeftStyle={styles.icAdd}
          iconRight={Images.icSend}
          iconRightStyle={styles.icAdd}
          onPressRight={() => {}}
        />
        <View style={{ flex: 1 }}/>
      </SafeAreaView>
    )
  }
}

export default EditProfile

EditProfile.defaultProps = {
  gotoTab: () => {}
}
EditProfile.propTypes = {
  gotoTab: PropTypes.func
}
const styles = {
  container: {
    flex: 1
  },
  icAdd: {
    width: 16,
    height: 16
  },
  text: {

  },
  icon: {
    width: 15,
    height: 15,
    paddingHorizontal: 10
  },
  search: {
    width: width - 80,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1 / 3,
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconAva: {
    width: 44,
    height: 44,
    margin: 10,
    borderRadius: 22
  },
  textInput: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  viewBottom: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  colorPicker: {
    width: 30,
    height: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 30,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4
  }
}
