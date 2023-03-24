import { Colors } from '@/assets/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    flex: 1
  },
  calendarContainer: {
    alignSelf: 'center',
    width: '90%'
  },
  textInput: {
    height: 50,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: Colors.backgroudWhite,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  }
});
