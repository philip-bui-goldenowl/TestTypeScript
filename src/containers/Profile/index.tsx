
import React, { useState } from 'react'
import {
  View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  calWidth,
  Colors,
  mainPaddingH,
  TypoGrayphy,
} from '@/assets/styles'
import {
  avatar,
  messageBlue,
  dateBlue,
  phoneBlue,
  passIcon,
} from '@/assets/icons'
import ProfileItem from './ProfileItem'
import { RootState } from '@/store'
import { Text } from '@/components'
import { ScreenName } from '@/constants'
import { ProfileProps } from '@/types/navigation'
import * as ImagePicker from 'react-native-image-picker';
import { useMutation } from '@apollo/client'
import { UPDATE_AVATAR } from '@/utils/queries'
import { setInfoUser } from '@/store/auth/slice'
interface Source {
  uri: string | undefined,
  type: string | undefined,
  name: string | undefined,
}
const Profile = ({ navigation }: ProfileProps) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [UpdateProfile] = useMutation(UPDATE_AVATAR);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const selectPhotoTapped = async () => {
    const response: ImagePicker.ImagePickerResponse = await ImagePicker.launchImageLibrary(options)
    if (response) {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode)
      } else {
        console.log('respinsesss', response.assets);
        const assets = response?.assets && response?.assets[0]
        const source = {
          uri: assets?.uri,
          type: assets?.type,
          name: assets?.fileName,
        }
        cloudinaryUpload(source)
      }

    }
  }
  const cloudinaryUpload = (source: Source) => {
    setLoading(true)
    const data = new FormData()
    data.append('file', source)
    data.append('upload_preset', 'uploadProfile')
    data.append("cloud_name", "dgputbexe")
    fetch("https://api.cloudinary.com/v1_1/dgputbexe/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        dispatch(setInfoUser({
          ...user,
          avatar: data?.secure_url
        }))
        UpdateProfile({
          variables: {
            id: user.id,
            avatar: data?.secure_url
          }
        })
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        Alert.alert("An Error Occured While Uploading")
      })
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.viewWrapper}>
        <View style={styles.viewProfile}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {loading && <ActivityIndicator size={'large'} color={Colors.primaryBlue} style={{ position: 'absolute', zIndex: 10 }} />}
            <Image source={user.avatar ? { uri: user.avatar } : avatar} style={styles.avatar} />
          </View>
          <TouchableOpacity onPress={selectPhotoTapped}>
            <View style={styles.viewAvatarName}>
              <Text style={styles.titleName}>{user.name}</Text>
              <Text style={styles.gmail}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ProfileItem
          image={dateBlue}
          label="Birthday"
          value="12-12-2000"
        />
        <ProfileItem
          image={messageBlue}
          label="Email"
          value={user.email}
          disabled
          nextScreen={() => { }}
        />
        <ProfileItem
          image={phoneBlue}
          label="Phone Number"
          value={user.phone.toString()}
          nextScreen={() => navigation.navigate(ScreenName.PHONE, {
            phone: user.phone,
            userId: user.id,
          })}
        />
        <ProfileItem
          image={passIcon}
          label="Change Password"
          value="•••••••••••••••••"
          nextScreen={() => navigation.navigate(ScreenName.UPDATE_PASSWORD, {
            userId: user.id
          })}
        />
      </View>
    </View >
  )
}
// interface Action {
//   title: string;
//   type: 'capture' | 'library';
//   options: ImagePicker.ImageLibraryOptions;
// }
// interface MediaType {
//   mediaType: string,
// }
const options: ImagePicker.ImageLibraryOptions = {
  selectionLimit: 0,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
}

const styles = StyleSheet.create({
  gmail: {
    ...TypoGrayphy.bodyNormalTextRegular,
    color: Colors.neutralGrey,
  },
  titleName: { ...TypoGrayphy.heading5 },
  viewAvatarName: {
    marginLeft: mainPaddingH,
  },
  avatar: {
    width: 72 * calWidth,
    height: 72 * calWidth,
    borderRadius: 36 * calWidth,
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24 * calWidth,
    marginBottom: 32 * calWidth,
  },
  viewWrapper: { flex: 1, paddingHorizontal: mainPaddingH },
  container: {
    flex: 1,
  },
})

export default Profile
