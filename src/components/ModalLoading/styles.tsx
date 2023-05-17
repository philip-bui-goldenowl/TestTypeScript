import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 80,
    width: 80,
    margin: -10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  backdrop: { flex: 1 },
  tipContainer: {
    marginTop: 15,
    width: '80%',
    alignItems: 'center'
  }
});
