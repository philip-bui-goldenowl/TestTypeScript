import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet, SafeAreaView, Alert,
} from 'react-native'
import { Button, TextInput, HeaderCommon } from '@/components'
import {
  calWidth,
  Colors,
  mainPaddingH,
} from '@/assets/styles'
import {
  messageBlue, passIcon,
} from '@/assets/icons'
import { useMutation } from '@apollo/client'
import { UPDATE_PASSWORD } from '@/utils/queries'
import { UpdateProps } from '@/types/navigation'

const UpdatePassword = ({ route, navigation }: UpdateProps) => {
  const [isActive, setIsActive] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [errors, setErrors] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: ''
  });
  const userId = route.params.userId

  const validate = () => {
    let isValid = true;
    if (!oldPassword) {
      handleError('Vui lòng nhập mật khẩu cũ', 'oldPass');
      isValid = false;
    }
    if (!newPassword) {
      handleError('Vui lòng nhập mật khẩu mới', 'newPass');
      isValid = false;
    }
    if (!confirmPassword) {
      handleError('Vui lòng xác nhận mật khẩu mới', 'confirmPass');
      isValid = false;
    }
    const notMatch = oldPassword.length > 0 && newPassword.length > 0 && oldPassword === newPassword
    if (notMatch) {
      handleError('Vui lòng không nhập trùng mật khẩu cũ', 'newPass')
      isValid = false;
    }
    if (newPassword !== confirmPassword) {
      handleError('Mật khẩu xác nhận không trùng khớp', 'confirmPass');
      isValid = false;
    } else {
      handleError('', 'confirmPass');
      return true
    }
    return isValid;
  };
  const [UpdatePassword] = useMutation(UPDATE_PASSWORD);
  const handleButtonSave = async () => {
    const isValid = validate()
    if (isValid) {
      const response = await UpdatePassword({
        variables: {
          id: userId,
          pass: newPassword
        }
      })
      console.log('ress', response.data);

      if (response.data?.update_user_by_pk) {
        Alert.alert('Đổi mật khẩu thành công')
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    if (oldPassword) {
      handleError('', 'oldPass')
    }
    if (newPassword) {
      handleError('', 'newPass')
    }
    if (confirmPassword) {
      handleError('', 'confirmPass')
    }
  }, [oldPassword, newPassword])
  const handleOnFocus = () => {
    setIsActive(isActive)
  }
  const handleError = (error: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const handleInput = (func: (value: string) => void, text: string) => {
    func(text)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderCommon title="Change Password" navigation={navigation} />
      <View style={{ flex: 1, paddingHorizontal: mainPaddingH }}>
        <TextInput
          iconLeft={isActive && isActive ? messageBlue : passIcon}
          label="Old Password"
          placeholder={'Old password'}
          handleOnchange={(value) => handleInput(setOldPassword, value)}
          onFocus={handleOnFocus}
          isActive={isActive}
          secure
          error={errors.oldPass}
        />
        <TextInput
          iconLeft={isActive && isActive ? messageBlue : passIcon}
          label="New Password"
          placeholder={'New Password'}
          handleOnchange={(value) => handleInput(setNewPassword, value)}
          onFocus={handleOnFocus}
          isActive={isActive}
          secure
          error={errors.newPass}
        />
        <TextInput
          iconLeft={isActive && isActive ? messageBlue : passIcon}
          label="New Password Again"
          placeholder={'New Password Again'}
          handleOnchange={(value) => handleInput(setConfirmPassword, value)}
          onFocus={handleOnFocus}
          isActive={isActive}
          secure
          error={errors.confirmPass}
        />

      </View>
      <View style={{ marginHorizontal: mainPaddingH }}>
        <Button name="Save" handleClick={handleButtonSave} />
      </View>
      <SafeAreaView />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    paddingHorizontal: mainPaddingH,
    paddingVertical: 12 * calWidth,
    borderRadius: 5 * calWidth,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.neutralLine,
    marginTop: 12 * calWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default UpdatePassword
