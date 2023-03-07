import React, { useState } from 'react'
import {
  View, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard
} from 'react-native'
import { useDispatch, } from 'react-redux'
// import { showMessage } from 'react-native-flash-message'
import { Text, Button } from '@/components'
import {
  logoWhite, message,
} from '@/assets/icons'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '@/utils/queries'
import { setInfoUser } from '@/store/auth/slice'
import { ScreenName, StorageKey } from '@/constants'
import Input from '@/components/Input'
import ModalInfo from '@/components/ModalInfo'
import StoredData from '@/utils/StoredData'
import { User } from '@/types/user'
import { LoginProps } from '@/types/navigation'
import styles from './styles';


const LoginScreen = (props: LoginProps) => {
  const { navigation } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    pass: ''
  });
  const [modalVisible, setModalVisible] = useState(false)
  const [LOGIN] = useLazyQuery(LOGIN_USER);

  const dispatch = useDispatch()

  const handleError = (error: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
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
  const handleLogin = async () => {
    const valid = validate()
    if (valid) {
      const response = await LOGIN({
        variables: {
          email: email,
          pass: password
        }
      })
      const user: User[] = response.data?.user
      if (user && user.length > 0) {
        await dispatch(setInfoUser(user[0]))
        await StoredData.set(StorageKey.memberId, user[0].id)
        navigation.navigate(ScreenName.MAIN_TAB)
      } else {
        setModalVisible(true)
      }

    }
  }
  const handleInput = (func: (value: string) => void, text: string) => {
    func(text)
  }
  const handleRegister = () => {
    //navigation.navigate(SCREEN_NAME.RegisterScreen)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.viewHeader}>
          <Image source={logoWhite} style={styles.logo} />
          <Text style={styles.label}>Welcome to My App</Text>
          <Text style={styles.labelSignIn}>Sign in to continue</Text>
        </View>
        <View style={styles.viewWrapper}>
          <Input label={'Email'}
            placeholder="Your Email"
            icon={message}
            value={email}
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={() => { }}
            onChangeText={(text) => handleInput(setEmail, text)}
            error={errors.email} />
          <Input
            label={'Pass word'}
            placeholder="Pass word"
            icon={message}
            //returnKeyType={'next'}
            onSubmitEditing={() => { }}
            value={password}
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => handleInput(setPassword, text)}
            error={errors.pass}
          />
          <View style={styles.viewButton}>
            <Button name="Sign In" handleClick={handleLogin} />
          </View>
          {/* <View style={styles.viewDivider}>
            <View style={styles.divider} />
            <Text style={styles.labelDivider}>
              Or
            </Text>
            <View style={styles.divider} />
          </View> */}
          {/* <View style={styles.viewLoginSocial}>
            <Image source={iconGoogle} style={styles.imageSocial} resizeMode="contain" />
            <Text style={styles.labelSocial}>
              Login with google
            </Text>
          </View> */}
          {/* <View style={styles.viewLoginSocial}>
            <Image source={iconFB} style={styles.imageSocial} resizeMode="contain" />
            <Text style={styles.labelSocial}>
              Login with facebook
            </Text>
          </View> */}
          {/* <TouchableOpacity>
            <Text style={styles.labelForgotPass}>Forget password</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={handleRegister}>
            <View style={styles.viewDontAccount}>
              <Text style={styles.titleDontAccount}>Don`t have a account?</Text>
              <Text style={styles.buttonRegister}>Register</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <ModalInfo
          onClose={() => { }}
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          textDescription='Thông tin đăng nhập không chính xác vui lòng nhập lại' />
      </View>
    </ScrollView>
  )
}


export default LoginScreen
