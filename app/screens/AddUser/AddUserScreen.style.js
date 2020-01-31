import { StyleSheet } from 'react-native';

import {
  LIGHT_GRAY_BACK,
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
  form: {
    backgroundColor: LIGHT_GRAY_BACK,
    borderRadius: 4,
    margin: 20,
  },
  formHeader: {
    backgroundColor: DARK_GRAY_BACK,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: 8,
  },
  formTitle: {
    fontSize: 28,
    color: '#FFF',
  },
  formBody: {
    padding: 20,
  },
  formLabel: {
    fontSize: 20,
    color: SECONDARY_GRAY_TEXT,
    marginTop: 20,
  },
  formInput: {
    backgroundColor: '#FFF',
    fontSize: 18,
    height: 40,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: DARK_GRAY_BACK,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default styles;
