import { StyleSheet, Platform } from 'react-native';

import {
  LIGHT_GRAY_BACK,
  DARK_GRAY_TEXT,
  DARK_GRAY_BACK
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
  listTitleText: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 8,
    marginBottom: 8,
    color: '#7B8D93',
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
    marginLeft: 20,
    fontSize: 18,
    color: '#9da6a9',
  },
  addButton: {
    backgroundColor: '#CFD8DC',
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#7B8D93',
    fontSize: 24,
  },
});

export default styles;