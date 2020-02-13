import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { LIGHT_GRAY_BACK, PRIMARY_GRAY_TEXT } from '../../theme/colors';

const UserProfileView = props => {
  const { data } = props;

  return (
    <View style={[styles.container, props.style]}>
      <Image style={styles.imageView} />
      <Text style={styles.titleText}>{data.title}</Text>
      {data.subTitle && (
        <Text style={styles.subTitleText}>[{data.subTitle}]</Text>
      )}
      {data.description && (
        <Text style={styles.descriptionText}>{data.description}</Text>
      )}
    </View>
  );
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
  titleText: {
    fontSize: 24,
    color: PRIMARY_GRAY_TEXT,
    marginTop: 20,
  },
  subTitleText: {
    fontSize: 20,
    color: PRIMARY_GRAY_TEXT,
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 18,
    color: PRIMARY_GRAY_TEXT,
    marginTop: 4,
  },
});

export default UserProfileView;
