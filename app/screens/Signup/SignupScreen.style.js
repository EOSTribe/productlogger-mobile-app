import { StyleSheet } from 'react-native';
import { LIGHT_GRAY_BACK, DARK_GRAY_BACK } from '../../theme/colors';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: LIGHT_GRAY_BACK,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  input: {
    backgroundColor: '#FFF',
    height: 40,
    width: 240,
    paddingHorizontal: 4,
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: DARK_GRAY_BACK,
    width: 240,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default styles;
