import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './AddUserScreen.style';
import { api } from '../../utilities/eos';
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
      const result = await api.transact(
        {
          actions: [
            {
              account: 'productloger',
              name: 'adduser',
              authorization: [
                {
                  actor: currentUser.accountName,
                  permission: 'active',
                },
              ],
              data: {
                user: username,
                manager: currentUser.accountName,
                description: description,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        },
      );

      console.log('add user result', result);
      setSpinnerVisible(false);

      const onBack = getParam('onBack');
      if (onBack) {
        onBack();
      }

      goBack();
    } catch (err) {
      console.log('add user error', err);
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
