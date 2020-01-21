import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  LIGHT_GRAY_BACK,
  DARK_GRAY_TEXT,
} from '../../theme/colors';

const UserProfileView = props => {
  const { data } = props;

  return (
    <View style={[styles.container, props.style]}>
      <Image style={styles.imageView} />
      <Text style={styles.nameText}>{data.username}</Text>
      <Text style={styles.roleText}>{data.role}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_GRAY_BACK,
    padding: 20,
    alignItems: 'center',
    borderRadius: 4,
  },
  imageView: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
  },
  nameText: {
    fontSize: 24,
    color: DARK_GRAY_TEXT,
    marginTop: 20,
  },
  roleText: {
    fontSize: 18,
    color: DARK_GRAY_TEXT,
    marginTop: 8,
  },
});

export default UserProfileView;