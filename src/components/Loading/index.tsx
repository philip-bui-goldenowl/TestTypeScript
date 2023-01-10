import { Colors } from '@/assets/styles';
import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';
interface Props {
  modalVisible: boolean,
  setModalVisible: any
}
const LoadingIndicator = ({ modalVisible, setModalVisible }: Props) => (
  <View style={{ backgroundColor: 'white' }}>
    <Modal
      animationType='slide'
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <ActivityIndicator size='large' color={Colors.black} />
      </View>
    </Modal>
  </View>
);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroudWhite,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default LoadingIndicator;
