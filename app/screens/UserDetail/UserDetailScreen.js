import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './UserDetailScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { DARK_GRAY_BACK } from '../../theme/colors';
import { removeUser } from '../../utilities/eos';
import { connectUser } from '../../redux/modules';

const UserDetailScreen = props => {
  const {
    navigation: { goBack, getParam },
    userState: { currentUser },
  } = props;

  const [enabled, setEnabled] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const userData = getParam('user', {});

  const _handleDelete = async () => {
    setSpinnerVisible(true);

    try {
      const result = await removeUser(currentUser.accountName, userData.id);

      console.log('delete user result', result);
      setSpinnerVisible(false);

      const onBack = getParam('onBack');
      if (onBack) {
        onBack();
      }

      goBack();
    } catch (err) {
      console.log('delete user error', err);
      setSpinnerVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView
          data={{ ...userData, title: userData.id }}
          style={styles.profileView}
        />
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
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(UserDetailScreen);
