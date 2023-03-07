
import { uploadUrl } from '@/constants';
import React from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const options: ImagePicker.ImageLibraryOptions = {
  selectionLimit: 0,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
}


export const ImagePickerResponse = async (callback: (value: string) => void) => {
  const response: ImagePicker.ImagePickerResponse = await ImagePicker.launchImageLibrary(options)
  if (response) {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode)
    } else {
      const assets = response?.assets && response?.assets[0]
      const source = {
        uri: assets?.uri,
        type: assets?.type,
        name: assets?.fileName,
      }
      const data = new FormData()
      data.append('file', source)
      data.append('upload_preset', 'uploadProfile')
      data.append("cloud_name", "dgputbexe")
      fetch(uploadUrl, {
        method: "post",
        body: data
      }).then(res => res.json()).
        then(async data => {
          const image = data?.secure_url
          callback(image)
        }).catch(err => {
          Alert.alert("An Error Occured While Uploading")
        })
    }
  }
}