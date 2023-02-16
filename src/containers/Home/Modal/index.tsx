import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

interface Props {
  modalVisible: boolean
  setShowModal: (value: boolean) => void
  onUpdateCategory: (title: string) => void,
  title: string | undefined
}
const ModalScreen = ({ modalVisible, setShowModal, onUpdateCategory, title }: Props) => {
  // const [modalVisible, setModalVisible] = useState(true);

  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title)
  }, [title])
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
          <Text style={styles.modalText}>Cập nhật tên sản phẩm!</Text>
          <View style={{
            flexDirection: 'row',
            width: 300,
            marginBottom: 16,
            borderWidth: 0.5,
            borderRadius: 8
          }}>
            <TextInput
              value={value}
              style={{ paddingVertical: 8, flex: 1, fontSize: 16, marginLeft: 10 }}
              onChangeText={(text) => {
                setValue(text)
              }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setShowModal(!modalVisible)
                onUpdateCategory(value)
                setValue('')
              }}
            >
              <Text style={styles.textStyle}>Cập nhật</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
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
    width: 100,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 8,
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
