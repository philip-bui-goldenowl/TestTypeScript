import React, { useState } from 'react'
import {
  View, SafeAreaView, Image, ScrollView, Keyboard, TouchableOpacity, Alert
} from 'react-native'
import { Text, Button } from '@/components'
import {
  logoWhite, message, iconUser, passIcon
} from '@/assets/icons'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '@/utils/queries'
import { ScreenName } from '@/constants'
import Input from '@/components/Input'
import { RegisterProps } from '@/types/navigation'
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ModalLoading from '@/components/ModalLoading'


const RegisterScreen = (props: RegisterProps) => {
  const { navigation } = props
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    pass: ''
  });
  const [REGISTER] = useMutation(REGISTER_USER);
  const [loading, setLoading] = useState(false)

  const handleError = (error: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!userName) {
      handleError('Vui lòng nhập họ tên', 'userName');
    } else {
      handleError('', 'userName');
    }
    if (!email) {
      handleError('Vui lòng nhập email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Email không hợp lệ', 'email');
      isValid = false;
    } else {
      handleError('', 'email');
    }

    if (!password) {
      handleError('Vui lòng nhập mật khẩu', 'pass');
      isValid = false;
    } else {
      handleError('', 'pass');
    }

    return isValid;
  };
  const handleRegister = async () => {
    setLoading(true)
    const valid = validate()
    if (valid) {
      const response = await REGISTER({
        variables: {
          name: userName,
          email: email,
          pass: password
        }
      })
      if (response.data) {
        Alert.alert('Đăng ký tài khoản thành công')
        setLoading(false)
        navigation.navigate(ScreenName.LOGIN)
      }

    }
    setLoading(false)
  }
  const handleInput = (func: (value: string) => void, text: string) => {
    func(text)
  }
  const goBackLogin = () => {
    navigation.goBack()
  }
  const { bottom } = useSafeAreaInsets()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.viewHeader}>
          <Image source={logoWhite} style={styles.logo} />
          <Text style={styles.label}>Let's get started</Text>
          <Text style={styles.labelSignIn}>Create an new account</Text>
        </View>
        <View style={styles.viewWrapper}>
          <Input
            placeholder="Full name"
            icon={iconUser}
            value={userName}
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={() => { }}
            onChangeText={(text) => handleInput(setUserName, text)}
            error={errors.userName} />
          <Input
            placeholder="Your Email"
            icon={message}
            value={email}
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={() => { }}
            onChangeText={(text) => handleInput(setEmail, text)}
            error={errors.email} />
          <Input
            placeholder="Pass word"
            icon={passIcon}
            onSubmitEditing={() => { }}
            value={password}
            isPassword
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => handleInput(setPassword, text)}
            error={errors.pass}
          />
          <View style={styles.viewButton}>
            <Button name="Sign Up" handleClick={handleRegister} />
          </View>
          <TouchableOpacity onPress={goBackLogin}>
            <View style={styles.viewDontAccount}>
              <Text style={styles.titleDontAccount}>have a account?</Text>
              <Text style={styles.buttonRegister}>Login</Text>
            </View>
          </TouchableOpacity>
          <View>
          </View>
        </View>
        {!!loading && <ModalLoading />}
        <View style={{ marginBottom: bottom }} />
      </View>
    </ScrollView>
  )
}


export default RegisterScreen
