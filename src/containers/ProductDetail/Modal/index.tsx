import icons from "@/assets/icons";
import { uploadUrl } from "@/constants";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Image, useWindowDimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { Order } from '@/types/order'
import FastImage from "react-native-fast-image";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY, ADD_PRODUCT, GET_CATEGORY, GET_ORDER } from "@/utils/queries";

interface Props {
  modalVisible: boolean
  setShowModal: (value: boolean) => void
  onUpdateCategory: (title: string) => void,
  title?: string | undefined
}

interface Source {
  uri: string | undefined,
  type: string | undefined,
  name: string | undefined,
}
const options: ImagePicker.ImageLibraryOptions = {
  selectionLimit: 0,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
}
const ModalScreen = ({ modalVisible, setShowModal, onUpdateCategory, title = 'Tên sản phẩm' }: Props) => {

  const [value, setValue] = useState(title);
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [image, setImage] = useState()
  const selectPhotoTapped = async () => {
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
        cloudinaryUpload(source)
      }
    }
  }
  const cloudinaryUpload = async (source: Source) => {
    setLoadingAvatar(true)
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
        setImage(image)
        setLoadingAvatar(false)
      }).catch(err => {
        setLoadingAvatar(false)
        Alert.alert("An Error Occured While Uploading")
      })
  }
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [
      { query: GET_CATEGORY }, // DocumentNode object parsed with gql
      //'GetComments' // Query name
    ]
  });



  const handlePressAdd = async () => {
    setShowModal(!modalVisible)
    // onUpdateCategory(value)
    setValue('')
    const res = await addCategory({
      variables: {
        image: image,
        title: value,
        banner: image
      }
    })
    if (res?.data?.insert_category) {
      Alert.alert('Thêm sản phẩm thành công')
    }

  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowModal(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Thêm sản phẩm!</Text>
          <Text style={[styles.textStyle, { color: 'black' }]}>Chọn hình ảnh</Text>
          <TouchableOpacity onPress={selectPhotoTapped}>
            <View style={[styles.viewImage, { borderWidth: image ? 0 : 0.5 }]}>
              <FastImage resizeMode="cover" style={{ height: 240, width: image ? 240 : 160, borderRadius: 20 }} source={image ? { uri: image } : icons.upload}
                onLoadStart={() => setLoadingAvatar(true)}
                onLoadEnd={() => setLoadingAvatar(false)} />
              {loadingAvatar && <View style={styles.loading}><ActivityIndicator size="small" color="#FFD700" /></View>}
            </View>
          </TouchableOpacity>
          <Text style={[styles.textStyle, { color: 'black' }]}>Tên sản phẩm</Text>
          <View style={styles.input}>
            <TextInput
              value={value}
              style={styles.textInput}
              onChangeText={(text) => {
                setValue(text)
              }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={handlePressAdd}
            >
              <Text style={styles.textStyle}>Thêm sản phẩm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowModal(!modalVisible)
                setValue('')
              }}
            >
              <Text style={styles.textStyle}>Huỷ</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen

const styles = StyleSheet.create({
  textInput: { paddingVertical: 8, flex: 1, fontSize: 16, marginLeft: 10 },
  viewImage: {
    height: 240, alignItems: 'center',
    borderRadius: 24, marginVertical: 8,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  loading: {
    position: "absolute",
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: 'row',
    width: 300,
    marginBottom: 16,
    borderWidth: 0.5,
    borderRadius: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: 16,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 8,
    flex: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  }
});
