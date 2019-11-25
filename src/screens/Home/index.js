/* eslint-disable no-unused-vars */
import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, SafeAreaView, TouchableOpacity, Image,
  View, Text, StatusBar
} from 'react-native'
import PropTypes from 'prop-types'
import { width, height, THEME_DEFAULT } from 'utils/globalStyles'
import NaviStore from 'mobxStore/NaviStore'
// import Moment from 'moment'
import UserStore from 'mobxStore/UserStore'
import FastImage from 'react-native-fast-image'
import PostStore from 'mobxStore/PostStore'
import Images from 'assets/Images'
import { FlatList } from 'react-native-gesture-handler'

@observer
class Home extends React.PureComponent {
  componentDidMount () {
    PostStore.getAllPost()
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
      this.forceUpdate()
    })
  }

  componentWillUnmount () {
    this._navListener.remove()
  }

  renderHeader = () => {
    return (
      <TouchableOpacity onPress={this.onPressHeader} style={styles.viewHeader}>
        <Image source={{ uri: UserStore.avatar }} style={styles.iconAva} />
        <Text style={{ color: THEME_DEFAULT.colorLightGray }}>What on your mind?</Text>
      </TouchableOpacity>)
  }

  renderItemList = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        PostStore.selectedPost = item
        NaviStore.pushToScreen('PostDetail')
      }} style={styles.itemView}>
        <View style={[styles.hearderItem]}>
          <FastImage source={{ uri: item.avatar }} style={styles.iconAva} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
            {/* <Text style={{ fontSize: 12, fontWeight: '100', marginTop: 5 }}>{Moment(item.PostedAt * 1000).fromNow()}</Text> */}
            <Text style={{ fontSize: 12, fontWeight: '100', marginTop: 5 }}>{item.time}</Text>
          </View>
        </View>
        <Text style={styles.txtDescription}>{item.descriptions}</Text>
        {item.image && <FastImage source={{ uri: item.image }} style={{ width: '100%', height: height(25), alignSelf: 'center' }}/>}
        <View style={styles.footerItem}>
          <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icLoveOn } style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{item.like}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icComment} style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{item.comments.length}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flex: 5, alignItems: 'flex-end', marginRight: 15 }}>
            <Image source={Images.icMore} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  onPressHeader = () => {
    NaviStore.pushToScreen('NewsFeedScreen')
  }

  render () {
    // const { } = this.props
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {this.renderHeader()}
        <FlatList
          data={PostStore.posts}
          keyExtractor={(i, index) => `cellpost${index}`}
          refreshing={false}
          renderItem={this.renderItemList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, backgroundColor: THEME_DEFAULT.colorLightGray }}
        />

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
    backgroundColor: 'white'
  },
  viewHeader: {
    width: width(100),
    height: height(8),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: THEME_DEFAULT.colorLine,
    borderBottomWidth: 0.5
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
    paddingVertical: 15,
    overflow: 'hidden'
  },
  itemView: {
    marginVertical: 2,
    backgroundColor: 'white'
    // borderRadius: 5
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
