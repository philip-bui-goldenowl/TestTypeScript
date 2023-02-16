import React, { useState } from 'react'
import {
  View, StyleSheet, SafeAreaView, Alert
} from 'react-native'
import {
  Button, TextInput, Header, HeaderCommon,
} from '@/components'
import {
  calWidth,
  Colors,
  mainPaddingH,
} from '@/assets/styles'
import {
  phoneBlue,
} from '@/assets/icons'
import { PhoneProps } from '@/types/navigation'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '@/utils/queries'
import { User } from '@/types/user'
import { setInfoUser } from '@/store/auth/slice'
import { useDispatch } from 'react-redux'
const Phone = ({ route, navigation }: PhoneProps) => {
  const { phone, userId } = route.params
  const [value, setValue] = useState(phone.toString())
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()

  const [UpdateProfile] = useMutation(UPDATE_PROFILE);
  const handleButtonSave = async () => {
    if (value) {
      const response = await UpdateProfile({
        variables: {
          id: userId,
          phone: parseInt(value),
        }
      })
      if (response.data?.update_user_by_pk) {
        const user: User = response.data?.update_user_by_pk
        dispatch(setInfoUser(user))
        Alert.alert('Cập nhật số điện thoại thành công')
        navigation.goBack()
      }

    }
  }

  const handleOnFocus = () => {
    setIsActive(!isActive)
  }
  const handleOnchange = (value: string) => {
    setValue(value)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderCommon title="Phone" navigation={navigation} />
      <View style={styles.viewWrapper}>
        <View>
          <TextInput
            iconLeft={phoneBlue}
            label="Change Phone"
            placeholder={value.toString()}
            handleOnchange={handleOnchange}
            onFocus={handleOnFocus}
            isActive={isActive}
          />
        </View>

      </View>
      <View style={{ marginHorizontal: mainPaddingH }}>
        <Button name="Save" handleClick={handleButtonSave} />
      </View>
      <SafeAreaView />

    </View>
  )
}

const styles = StyleSheet.create({
  introduce: { marginTop: 8 * calWidth, color: Colors.primaryBlue },
  viewWrapper: { flex: 1, paddingHorizontal: mainPaddingH },
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

export default Phone
