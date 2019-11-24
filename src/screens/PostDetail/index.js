/*
 * Created by Jeremy on Fri Jun 15 2018
 *
 * Copyright (c) 2018 Jeremy
 */
import React, { PureComponent } from 'react'

import {
  View, Dimensions, TouchableOpacity, FlatList,
  Image, TextInput, Text, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types'
// import Header from 'components/Header'
import Images from 'assets/Images'
import NaviStore from 'mobxStore/NaviStore'
import { height, THEME_DEFAULT } from 'utils/globalStyles'

const { width } = Dimensions.get('window')

class PostDetail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      txtStatus: '',
      comments: [1, 2, 3, 4, 5]
    }
  }

    renderBottom =() => {
      return (
        <View style={{
          flexDirection: 'row',
          paddingLeft: 16,
          marginTop: 15
        }}>
          <View style={styles.search}>
            <TextInput
              style={{ flex: 1, color: '#2A2A2A', paddingLeft: 10 }}
              onChangeText={(text) => this.setState({ comment: text })}
              multiline={true}
              maxLength={100}
              placeholder={'Nhập bình luận'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              returnKeyType='done'
              autoFocus={false}
              autoCapitalize={'none'}
              ref={ref => { this.textInputRef = ref }}
            />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.icSend} style={{ width: 24, height: 24, margin: 10, alignSelf: 'flex-start' }} />
          </TouchableOpacity>
        </View>
      )
    }

    renderEmotion = () => {
      return (
        <View style={styles.viewBottom}>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icLoveOn } style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{'10'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Image source={Images.icComment} style={styles.icon} />
              <Text style={{ paddingLeft: 5 }}>{'6'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flex: 5, alignItems: 'flex-end', paddingRight: 10  }}>
            <Image source={Images.icMore} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )
    }

    renderMiddel = () => {
      _keyExtractor = (item, index) => index.toString()
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={this.renderHeader()}
            // ListFooterComponent={this.renderBottom()}
            data={this.state.comments}
            keyExtractor={_keyExtractor}
            renderItem={(item, index) => this.renderRowItemComment(item, index)}
          />
        </View>
      )
    }

    renderRowItemComment =() => {
      return (
        <View style={{ flexDirection: 'row', paddingLeft: 30, paddingTop: 10 }}>
          <Image source={Images.imgTemp} style={{ width: 44, height: 44 }} />
          <View style={{
            flex: 1,
            borderBottomWidth: 0.5,
            borderBottomColor: THEME_DEFAULT.colorLine,
            paddingLeft: 10,
            paddingBottom: 5
          }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{'Anonymous'}</Text>
            <Text style={{ fontSize: 13, fontWeight: '400', marginTop: 5 }}>{'Dat dep trai'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '300' }}>{'4 days ago'}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }}>
                <Image source={Images.icReply} style={{ width: 24, height: 24 }} />
                <Text style={{ fontSize: 12, fontWeight: '300', marginVertical: 5 }}>Trả lời</Text>
              </View>
            </View>
          </View>
        </View>)
    }

    renderHeader () {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ width, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => NaviStore.goBack()} style={{ justifyContent: 'center' }}>
              <Image source={Images.icBack} style={styles.icBack} />
            </TouchableOpacity>
            <Image source={Images.imgTemp} style={styles.iconAva} />
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Anonymous</Text>
              <Text style={{ fontSize: 13, fontWeight: '300' }}>21 mins</Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{ position: 'absolute', right: 5 }}>
              <Image source={Images.icOption} style={styles.icOption} />
            </TouchableOpacity>
          </View>
          {/* <TextInput
            style={styles.textInput}
            scrollEnabled={false}
            onChangeText={(text) => this.setState({ txtStatus: text })}
            value={this.state.txtStatus}
            multiline={true}
            placeholder={'Say something about these photo...'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            returnKeyType='done'
            autoFocus={false}
            autoCapitalize={'none'}
          /> */}
          <Text style={styles.txtDescription}>{'I used to be so beautiful now look at me...'}</Text>
          <Image source={Images.imgTemp} style={{ width: '98%', height: height(30), alignSelf: 'center' }} resizeMode={'center'}/>
          {this.renderEmotion()}
        </View>
      )
    }

    render () {
      // const { txtStatus, images } = this.state
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            {this.renderMiddel()}
            {this.renderBottom()}
          </KeyboardAvoidingView>
        </SafeAreaView>
      )
    }
}

export default PostDetail

PostDetail.defaultProps = {
  gotoTab: () => {}
}
PostDetail.propTypes = {
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
  icBack: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  icOption: {
    width: 24,
    height: 24,
    marginHorizontal: 10
  },
  icon: {
    width: 15,
    height: 15,
    paddingHorizontal: 10
  },
  search: {
    width: width - 80,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 0.5,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconAva: {
    width: 44,
    height: 44,
    marginRight: 10,
    borderRadius: 22
  },
  textInput: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  viewBottom: {
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: THEME_DEFAULT.colorLine,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewMiddle: {

  },
  txtDescription: {
    paddingHorizontal: 10,
    paddingVertical: 5
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
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
}
