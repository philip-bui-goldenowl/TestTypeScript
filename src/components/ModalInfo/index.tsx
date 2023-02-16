import icons from '@/assets/icons';
import { Colors } from '@/assets/styles';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

interface Props {
  modalVisible: boolean,
  textDescription: string,
  onClose: () => void,
  setModalVisible: () => void,
}
const ModalInfo = ({
  modalVisible,
  textDescription,
  onClose,
  setModalVisible,
}: Props) => {
  return (
    <Modal animationType={'none'} transparent visible={modalVisible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPressOut={setModalVisible}>
        <View style={styles.body}>
          <View style={styles.viewIcon}>
            <Image source={icons.notification} style={{ tintColor: Colors.backgroudWhite }} />
          </View>
          <Text style={styles.text_info}>{textDescription}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default ModalInfo;

const styles = StyleSheet.create({
  viewIcon: {
    width: 34,
    height: 34,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: width - 100,
  },
  view_action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view_button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58,
    flex: 1,
    paddingVertical: 14,
  },
  text_title: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    paddingBottom: 12,
    color: Colors.primaryBlue,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddc7c7',
    borderRadius: 3,
  },
  text_button: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  text_info: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.primaryBlue,
    marginBottom: 12,
  },
});
