import { StyleSheet } from 'react-native';

import {
  DARK_GRAY_BACK,
} from '../../theme/colors';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  profileView: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  button: {
    backgroundColor: DARK_GRAY_BACK,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 40,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default styles;