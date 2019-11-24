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
import ImagePicker from 'react-native-image-crop-picker'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Images from 'assets/Images'
import NaviStore from 'mobxStore/NaviStore'
import { height, THEME_DEFAULT } from 'utils/globalStyles'

const { width } = Dimensions.get('window')

class PostDetail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      txtStatus: '',
      images: []
    }
  }

    pickMultipleImages = () => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        waitAnimationEnd: false,
        includeExif: true,
        multiple: true
      }).then(images => {
        // console.log('image', images)
        // if (ARR_IMAGE.length !== 0) {
        //   ARR_IMAGE.pop()
        // }
        // images.map((i, key) => {
        //   ARR_IMAGE.push({ id: key, uri: i.path, width: i.width, height: i.height, mime: i.mime })
        // })
        // ARR_IMAGE.push({ id: -1, uri: '', width: 90, height: 90, mime: 'image/jpeg' })
        this.setState({
          images
        })
      }).catch(e => console.log(e))
    }

    renderRowItemImage = ({ item, index }) => {
      return (
        <View style={{ marginRight: index % 2 === 0 ? 3 : 0 }}>
          <Image style={{ height: height(40), width: width / 2 }}
            source={{ uri: item.path }} />
          {/* <TouchableOpacity
              onPress={() => {
                this.setState({
                  images: []
                })
              }}
              style={{ width: 24, height: 24, top: 0, right: -3, position: 'absolute', justifyContent: 'center' }}>
              <Image source={Images.icDelete} style={{ width: 16, height: 16 }} />
            </TouchableOpacity> */}

        </View>
      )
    }

    _keyExtractor = (item, index) => index.toString();

    renderBottom = () => {
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
          <TouchableOpacity style={{ flex: 5, alignItems: 'flex-end' }}>
            <Image source={Images.icMore} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )
    }

    renderMiddel () {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={this.renderBottom()}
            data={this.state.images}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={(item, index) => this.renderRowItemImage(item, index)}
          />
        </View>
      )
    }

    renderHeader () {
      return (
        <View style={{ }}>
          <View onPress={this.onPressHeader}
            style={{ width, flexDirection: 'row' }}>
            <Image source={Images.imgTemp} style={styles.iconAva} />
            <Text style={{ paddingTop: 10, fontSize: 18 }}>Jeremy</Text>
          </View>
          <TextInput
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
          />
        </View>
      )
    }

    render () {
      // const { txtStatus, images } = this.state
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <Header
            onPressLeft={() => NaviStore.goBack()}
            iconLeft={Images.icClose}
            iconLeftStyle={styles.icAdd}
          />
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            {this.renderMiddel()}
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
    paddingBottom: 10
  },
  viewBottom: {
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: THEME_DEFAULT.line,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewMiddle: {

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
