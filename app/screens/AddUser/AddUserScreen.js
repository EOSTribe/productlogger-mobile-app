import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import styles from './AddUserScreen.style';
import { addUser } from '../../utilities/eos';
import { connectUser } from '../../redux/modules';

const AddUserScreen = props => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const {
    userState: { currentUser },
    navigation: { goBack, getParam },
  } = props;

  const _handleAddUser = async () => {
    setSpinnerVisible(true);

    try {
      const result = await addUser(
        currentUser.accountName,
        username,
        description,
      );

      console.log('add user result', result);
      setSpinnerVisible(false);

      const onBack = getParam('onBack');
      if (onBack) {
        onBack();
      }

      goBack();
    } catch (err) {
      Toast.show(err.message || 'Something went wrong');
      setSpinnerVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New User</Text>
          </View>
          <View style={styles.formBody}>
            <Text style={styles.formLabel}>Username</Text>
            <TextInput
              style={styles.formInput}
              value={username}
              onChangeText={setUsername}
              autoCapitalize={'none'}
            />
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={styles.formInput}
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={_handleAddUser}>
              <Text style={styles.addButtonText}>Add User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(AddUserScreen);
