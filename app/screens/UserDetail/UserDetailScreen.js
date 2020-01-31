import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './UserDetailScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { DARK_GRAY_BACK } from '../../theme/colors';

const UserDetailScreen = props => {
  const { navigation } = props;

  const [enabled, setEnabled] = useState(false);
  const userData = navigation.getParam('user', {});

  const _handleDelete = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView data={userData} style={styles.profileView} />
        <View style={styles.switchWrapper}>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            ios_backgroundColor={DARK_GRAY_BACK}
          />
          <Text style={styles.switchLabel}>Enabled</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={_handleDelete}>
          <Text style={styles.deleteButtonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
