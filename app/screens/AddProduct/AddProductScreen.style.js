import { StyleSheet } from 'react-native';

import { DARK_GRAY_BACK, SECONDARY_GRAY_TEXT } from '../../theme/colors';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileView: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  formLabel: {
    fontSize: 20,
    color: SECONDARY_GRAY_TEXT,
    marginTop: 20,
  },
  formInput: {
    backgroundColor: '#FFF',
    fontSize: 18,
    height: 48,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  nameInput: {
    height: 48,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  tagInput: {
    height: 48,
  },
  button: {
    backgroundColor: DARK_GRAY_BACK,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
  scanButton: {
    marginTop: 20,
  },
  saveButton: {},
});

export default styles;
