/*
 * Created by Jeremy on Fri Jun 15 2018
 *
 * Copyright (c) 2018 Jeremy
 */
import React, { PureComponent } from 'react'

import {
  View, Dimensions, ScrollView, TouchableOpacity, FlatList,
  Image, TextInput, Text, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Images from 'assets/Images'
import NaviStore from 'mobxStore/NaviStore'

const { width } = Dimensions.get('window')

class NewsFeedScreen extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      txtStatus: '',
      image: []
    }
  }

  pickMultipleImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      waitAnimationEnd: false,
      includeExif: true
    }).then(image => {
      // if (ARR_IMAGE.length != 0) {
      //   ARR_IMAGE.pop()
      // }
      // images.map((i, key) => {
      //   ARR_IMAGE.push({ id: key, uri: i.path, width: i.width, height: i.height, mime: i.mime })
      // })
      // ARR_IMAGE.push({ id: -1, uri: '', width: 90, height: 90, mime: 'image/jpeg' })
      this.setState({
        image: image
      })
    }).catch(e => console.log(e))
  }

  renderRowItemImage = (image) => {
    return (
      <View style={{ height: 102, width: 102, margin: 6 }}>
        <View style={{ flex: 1 }}>
          <View style={{ bottom: 0, left: 0, position: 'absolute' }}>
            <Image style={{ height: 90, width: 90, borderRadius: 5 }}
              source={{ uri: image.item.path }} />
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{ width: 24, height: 24, top: 0, right: 0, position: 'absolute' }}>
            <Image source={Images.icDelete} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => index.toString();

  renderBottom = () => {
    return (
      <View style={styles.viewBottom}>
        {/* <TouchableOpacity style={styles.colorPicker}>
          <Image source={Images.icbgSTT} resizeMode={'center'}/>
        </TouchableOpacity> */}
        <View style={styles.viewBottom}>
          <TouchableOpacity
            onPress={this.pickMultipleImages}
            style={[styles.colorPicker, { borderRadius: 8 }]}>
            <Image source={Images.icImage} resizeMode={'contain'}/>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button}>
            <Image style={styles.icon} source={Images.icMap} resizeMode={'contain'}/>
            <Text style={styles.text}>Địa điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.icon} source={Images.icTag} resizeMode={'contain'}/>
            <Text style={styles.text}>Với bạn bè</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }

  renderMiddel () {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.images}
          numColumns={3}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItemImage}
        />
      </View>
    )
  }

  renderHeader () {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
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
            placeholder={'Hôm nay bạn thế nào ?'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            returnKeyType='done'
            autoFocus={false}
            autoCapitalize={'none'}
          />
        </View>
      </ScrollView>
    )
  }

  render () {
    const { txtStatus, images } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={'Create Post'}
          onPressLeft={() => NaviStore.goBack()}
          iconLeft={Images.icClose}
          iconLeftStyle={styles.icAdd}
          iconRight={Images.icSend}
          iconRightStyle={styles.icAdd}
          onPressRight={() => {}}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'white' }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
          {this.renderHeader()}
          {this.renderMiddel()}
          {this.renderBottom()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

export default NewsFeedScreen

NewsFeedScreen.defaultProps = {
  gotoTab: () => {}
}
NewsFeedScreen.propTypes = {
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
