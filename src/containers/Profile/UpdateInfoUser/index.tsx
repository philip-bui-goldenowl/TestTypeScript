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
  dateBlue,
  phoneBlue,
} from '@/assets/icons'
import { PhoneProps, UpdateInfoUserProps } from '@/types/navigation'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '@/utils/queries'
import { User } from '@/types/user'
import { setInfoUser } from '@/store/auth/slice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import CalendarPicker from '../Calander'
const UpdateInfoUser = ({ route, navigation }: UpdateInfoUserProps) => {
  const [value, setValue] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [info, setInfo] = useState({
    email: user.email,
    phone: user.phone,
    birthDay: user.birthday
  });



  const [UpdateProfile] = useMutation(UPDATE_PROFILE);
  const handleButtonSave = async () => {
    if (info) {
      const response = await UpdateProfile({
        variables: {
          id: user.id,
          phone: info.phone,
          email: info.email,
          birthday: info.birthDay
        }
      })
      if (response.data?.update_user_by_pk) {
        const user: User = response.data?.update_user_by_pk
        dispatch(setInfoUser(user))
        Alert.alert('Cập nhật thông tin thành công')
        navigation.goBack()
      }

    }
  }
  const handleSetInfo = (value: string, input: string) => {
    setInfo((prevState) => ({ ...prevState, [input]: value }));
  };

  const handleOnFocus = () => {
    setIsActive(!isActive)
  }
  const handleOnchange = () => {

    setVisible(!visible)
  }

  const handleGetDay = (date: any) => {
    //console.log("afafafaafaf", date);
    handleSetInfo(date?.dateString, 'birthDay')
    setVisible(!visible)
  }



  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderCommon title="Update Info User" navigation={navigation} />
      <View style={styles.viewWrapper}>
        <TextInput
          iconLeft={phoneBlue}
          label="Email"
          placeholder={info.email}
          handleOnchange={(text) => handleSetInfo(text, 'email')}
          onFocus={handleOnFocus}
          isActive={isActive}
        />
        <TextInput
          iconLeft={phoneBlue}
          label="Phone"
          placeholder={info.phone.toString()}
          handleOnchange={(text) => handleSetInfo(text, 'phone')}
          onFocus={handleOnFocus}
          isActive={isActive}
        />
        <TextInput
          iconLeft={dateBlue}
          label="BirthDay"
          isInput
          handleOnchange={() => { }}
          placeholder={info.birthDay ?? 'Ngày sinh'}
          onPressInput={handleOnchange}
          onFocus={handleOnFocus}
          isActive={isActive}
        />

      </View>
      <View style={{ marginHorizontal: mainPaddingH }}>
        <Button name="Save" handleClick={handleButtonSave} />
      </View>
      <SafeAreaView />
      <CalendarPicker isVisible={visible} onDayPress={handleGetDay} />
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

export default UpdateInfoUser
