import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './UserHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';

const UserHomeScreen = props => {
  const {
    navigation: { navigate },
  } = props;

  const userData = {
    username: 'johndoeuser',
    image: '',
    role: 'User',
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView data={userData} style={styles.profileView} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('AddProduct')}>
          <Text style={styles.buttonText}>Add new product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('AddRecord')}>
          <Text style={styles.buttonText}>Add record</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserHomeScreen;
