import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image,
  View, Text
} from 'react-native'
import PropTypes from 'prop-types'
import { THEME_DEFAULT, FONT, width, height } from 'utils/globalStyles'
import Moment from 'moment'
// import HomeStore from 'mobxStore/HomeStore'
// import Modal from 'components/ModalBox'

// import { IcHome } from 'utils/globalIcons'
import Images from 'assets/Images'

@observer
class Home extends React.PureComponent {
  renderHeader = () => {
    return (
      <TouchableOpacity onPress={this.onPressHeader}
        style={styles.viewHeader}>
        <Image source={Images.imgTemp} style={styles.iconAva} />
        <TextInput
          style={{ color: '#2A2A2A', width: width(80) }}
          onChangeText={() => {
          }}
          editable={false}
          multiline={true}
          placeholder={'Hôm nay bạn thế nào ?'}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          returnKeyType='done'
          autoFocus={false}
          autoCapitalize={'none'}
        />
        <Image source={Images.icNext} style={{ width: 24, height: 24, paddingRight: 20, backgroundColor: 'red', }} />
      </TouchableOpacity>)
  }

  renderItemList = () => {
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
        <Image source={Images.imgTemp} style={{ width: width(100), height: height(25),alignSelf: 'center' }} resizeMode={'center'}/>
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

  onPressHeader = () => {
    // this.refs.modal.open()
  }

  render () {
    const { gotoTab } = this.props
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {this.renderHeader()}
        {this.renderItemList()}
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
    flex: 1
  },
  viewHeader: {
    width: width(100),
    height: height(8),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
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
  itemView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 5
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
