import { StyleSheet } from 'react-native';

import {
  DARK_GRAY_BACK,
  SECONDARY_GRAY_TEXT,
  LIGHT_GRAY_BACK,
  PRIMARY_GRAY_TEXT,
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
  listTitleText: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 8,
    marginBottom: 8,
    color: SECONDARY_GRAY_TEXT,
  },
  listItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    paddingHorizontal: 12,
    backgroundColor: LIGHT_GRAY_BACK,
  },
  listItemImage: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  listItemText: {
    marginHorizontal: 20,
    fontSize: 18,
    color: PRIMARY_GRAY_TEXT,
    flex: 1,
  },
});

export default styles;
