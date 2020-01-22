import { StyleSheet, Platform } from 'react-native';

import {
  DARK_GRAY_BACK,
  SECONDARY_GRAY_TEXT,
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
  deleteButton: {
    backgroundColor: DARK_GRAY_BACK,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    borderRadius: 4,
    marginTop: 32,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 32,
  },
  switchLabel: {
    color: SECONDARY_GRAY_TEXT,
    fontSize: 20,
    marginLeft: 8,
  }
});

export default styles;