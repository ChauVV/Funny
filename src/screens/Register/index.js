import React from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Image, View,
  StatusBar
} from 'react-native'
// import PropTypes from 'prop-types'
import { height, THEME_DEFAULT, width } from 'utils/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UserStore from 'mobxStore/UserStore'

@observer
class Register extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = ({
      value: ''
    })
  }

  render () {
    const { value } = this.state
    return (

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Image style={styles.logo} source={require('./logoMantu.gif')}/>
            <Text style={styles.funny}>.WeSpeak</Text>
            {/* <Text style={styles.title}>Select a name</Text> */}
            <TextInput
              value={value}
              onChangeText={value => this.setState({ value })}
              placeholder='Select an anonymous name.'
              style={styles.input}
              placeholderTextColor='gray'
            />
            <TouchableOpacity style={styles.btn} onPress={() => UserStore.login(value)}>
              <Text style={styles.btnText}>Join</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

export default Register

Register.defaultProps = {
}
Register.propTypes = {
}

const styles = StyleSheet.create({
  funny: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height(4),
    marginBottom: height(5),
    marginTop: 30
  },
  btnText: {
    color: 'white'
  },
  content: {
    height: height(100),
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: height(1.5),
    borderRadius: 5,
    width: width(70),
    marginVertical: height(4),
    color: 'white'
  },
  btn: {
    marginTop: height(3),
    marginBottom: height(30),
    width: width(50),
    height: height(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
  },
  logo: {
    height: height(10),
    width: height(30)
  },
  title: {
    fontSize: height(1),
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: THEME_DEFAULT.colorBackground
  }
})
