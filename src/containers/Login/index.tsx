import React, { useState } from 'react'
import {
  View, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard
} from 'react-native'
import { useDispatch, } from 'react-redux'
// import { showMessage } from 'react-native-flash-message'
import { Text, Button } from '@/components'
import icons, {
  logoWhite, message, iconFB, iconGoogle
} from '@/assets/icons'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOGIN_USER, SAVE_USER } from '@/utils/queries'
import { setInfoUser } from '@/store/auth/slice'
import { ScreenName, StorageKey } from '@/constants'
import Input from '@/components/Input'
import ModalInfo from '@/components/ModalInfo'
import StoredData from '@/utils/StoredData'
import { User } from '@/types/user'
import { LoginProps } from '@/types/navigation'
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LoginManager, Profile } from 'react-native-fbsdk-next';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';

// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';


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
  const [InsertUser] = useMutation(SAVE_USER);

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
  const saveUser = async (name: string, email: string) => {
    const res = await InsertUser({
      variables: {
        name: name,
        email: email,
      }
    })

    if (res.data) {
      const user = res.data?.insert_user?.returning
      await dispatch(setInfoUser(user[0]))
      await StoredData.set(StorageKey.memberId, user[0].id)
      navigation.navigate(ScreenName.MAIN_TAB)
    }

  }
  const onAppleButtonPress = async () => {
    // 1). start a apple sign-in request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // 2). if the request was successful, extract the token and nonce
      //const { identityToken, nonce } = appleAuthRequestResponse;
      console.log("afafafafafafaaf", appleAuthRequestResponse.user);


      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (error) {
      console.log("erorroror", error);

    }
  }
  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: "
          );
          Profile.getCurrentProfile().then(
            function (currentProfile) {
              if (currentProfile) {
                const name = currentProfile.name ?? 'userName'
                const email = currentProfile.email ?? ""
                saveUser(name, email)

              }
            }
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
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
  const { bottom } = useSafeAreaInsets()
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
            isPassword
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={(text) => handleInput(setPassword, text)}
            error={errors.pass}
          />
          <View style={styles.viewButton}>
            <Button name="Sign In" handleClick={handleLogin} />
          </View>
          <View style={styles.viewDivider}>
            <View style={styles.divider} />
            <Text style={styles.labelDivider}>
              Or
            </Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity onPress={onAppleButtonPress}>
            <View style={styles.viewLoginSocial}>
              <Image source={iconGoogle} style={styles.imageSocial} resizeMode="contain" />
              <Text style={styles.labelSocial}>
                Login with apple
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={loginWithFacebook}>
            <View style={styles.viewLoginSocial}>
              <Image source={iconFB} style={styles.imageSocial} resizeMode="contain" />
              <Text style={styles.labelSocial}>
                Login with facebook
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {/* <LoginButton
              //style={{ width: 500 }}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        console.log(data.accessToken.toString())
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => console.log("logout.")} /> */}
          </View>
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
