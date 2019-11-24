/*
 * Created by Jeremy on Fri Jun 15 2018
 *
 * Copyright (c) 2018 Jeremy
 */
import React, { PureComponent } from 'react'
import {
  View, Dimensions, SafeAreaView, StatusBar,
  Image, TouchableOpacity, Text,
  TextInput
} from 'react-native'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Images from 'assets/Images'
import NaviStore from 'mobxStore/NaviStore'
import UserStore from 'mobxStore/UserStore'
import { IcCamera } from 'utils/globalIcons'
import Messages from 'utils/globalMessages'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
import { THEME_DEFAULT } from 'utils/globalStyles'

const AVATAR_HEIGHT = 120
const HEADER_MAX_HEIGHT = 300

const { width } = Dimensions.get('window')

@observer
class EditProfile extends PureComponent {
  constructor (props) {
    super(props)
    this.state = ({
      name: UserStore.name,
      bio: UserStore.bio
    })
  }

  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
    })
  }

  componentWillUnmount () {
    this._navListener.remove()
  }

  selectActionSheet = (i) => {
    console.log('selectActionSheet: ', i)
    if (i === 1) {
      this.pickSingleWithCamera()
    } else if (i === 2) {
      this.onOpenPickerImage()
    }
  }

  onOpenPickerImage = () => {
    console.log('onOpenPickerImage')
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        waitAnimationEnd: false,
        includeExif: true,
        multiple: false
      }).then(image => {
        console.log('update avatar: ', image)
        UserStore.avatar = image.path
      }).catch(e => console.log('pickSingleWithCamera', e))
    } catch (error) {
      console.log('onOpenPickerImage: ', error)
    }
  }

  pickSingleWithCamera = () => {
    try {
      console.log('pickSingleWithCamera')
      ImagePicker.openCamera({
        width: width(100), height: height(100)
      }).then(image => {
        console.log('update avatar: ', image)
        UserStore.avatar = image.path
      }).catch(e => console.log('pickSingleWithCamera1!', e))
    } catch (error) {
      console.log('pickSingleWithCamera2', error)
    }
  }

  render () {
    const { name, bio } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          title={'Edit Profile'}
          onPressLeft={() => NaviStore.goBack()}
          iconLeft={Images.icBack}
          iconLeftStyle={styles.icAdd}
          iconRightStyle={styles.icAdd}
          onPressRight={() => {}}
        />
        <View style={{ flex: 1 }}>
          {/* Avatar */}
          <View style={[styles.viewAvatar]} >
            <TouchableOpacity
              onPress={() => {
                console.log('press')
                this.ActionSheet.show()
              }}
            >
              { UserStore.avatar
                ? <Image
                  pointerEvents="none"
                  style={[styles.avatar]}
                  source={{ uri: UserStore.avatar }}
                />
                : <Image
                  pointerEvents="none"
                  style={[styles.avatar]}
                  source={Images.defaultAvatar}
                />}
              <View style={styles.avatarOverlayTop}>
                <View style={styles.avatarOverlay}>
                  <IcCamera size={25}/>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Name: </Text>
            <TextInput
              value={name}
              onChangeText={(name) => this.setState({ name })}
              style={styles.inputName}
              placeholder={'name'}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.label}>Bio: </Text>
            <TextInput
              value={bio}
              onChangeText={(bio) => this.setState({ bio })}
              style={styles.inputName}
              placeholder={'bio'}
              maxLength={40}
              numberOfLines={2}
              multiline={true}
              returnKeyType='done'
            />
          </View>

          <TouchableOpacity
            style={styles.btnSave}
            onPress={() => UserStore.saveInfo(this.state.name, this.state.bio)}
          >
            <Text style={styles.btnSaveText}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <ActionSheet
          ref={o => { this.ActionSheet = o }}
          title={Messages.cameraTitle}
          options={[Messages.cancel, Messages.cameraCapture, Messages.cameraGallery]}
          cancelButtonIndex={0}
          onPress={(e) => this.selectActionSheet(e)}
        />
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
  btnSaveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnSave: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'green'
  },
  inputName: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: THEME_DEFAULT.colorLightGray,
    color: 'gray',
    marginTop: 5
  },
  inputView: {
    paddingHorizontal: 20,
    marginTop: 50
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 70
  },
  avatarOverlayTop: {
    position: 'absolute',
    bottom: 0,
    height: AVATAR_HEIGHT,
    width: AVATAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AVATAR_HEIGHT / 2,
    backgroundColor: 'transparents',
    overflow: 'hidden'
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    height: 2 * AVATAR_HEIGHT / 5,
    width: AVATAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)',
    overflow: 'hidden'
  },
  avatar: {
    height: AVATAR_HEIGHT,
    width: AVATAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AVATAR_HEIGHT / 2,
    resizeMode: 'cover'
  },
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
  },
  btnEdit: {
    marginRight: 15,
    marginTop: 25
  },
  bar: {
    marginTop: 38,
    height: 82,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fill: {
    flex: 1
  },
  nonsenseItem: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    margin: 8,
    borderRadius: 10,
    padding: 10
  },
  itemText: {
    fontSize: 40,
    padding: 20,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT
  },
  imgHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    zIndex: 1,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  bio: {
    color: 'white',
    fontSize: 10,
    marginLeft: 10
  },
  name: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  viewAvatar: {
    backgroundColor: 'transparent',
    height: AVATAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
}
