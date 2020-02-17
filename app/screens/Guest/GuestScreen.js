import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import RadioButton from 'react-native-radio-button';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';

import styles from './GuestScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { DARK_GRAY_BACK } from '../../theme/colors';
import { connectUser, promisify } from '../../redux/modules';

const ManagerListItem = props => {
  const { data, onPress, isSelected } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <RadioButton
          isSelected={isSelected}
          onPress={() => onPress(data)}
          innerColor={DARK_GRAY_BACK}
          outerColor={DARK_GRAY_BACK}
        />
        <Text style={styles.listItemText}>
          {data.id} [{data.description}]
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const ManagerHomeScreen = props => {
  const {
    userState: { users, currentUser },
  } = props;

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  const _handlePressUserItem = data => {
    setSelectedManager(data);
  };

  const _handleRequestAccess = async () => {
    if (!selectedManager) {
      Toast.show('Please select a manager');
      return;
    }

    setSpinnerVisible(true);

    try {
      let response = await promisify(props.requestAccess, {
        manager_name: selectedManager.id,
        user_name: currentUser.accountName,
      });
      console.log('request access response', response);
      setSpinnerVisible(false);
      Toast.show('Request sent successfully');
    } catch (e) {
      setSpinnerVisible(false);
      Toast.show(e.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const filtered = _.filter(users, item => item.id === item.manager);
    setManagers(filtered);
  }, [users]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView
          data={{
            title: currentUser.fullName,
            subTitle: currentUser.accountName,
            description: currentUser.role,
          }}
          style={styles.profileView}
        />
        <Text style={styles.listTitleText}>Managers</Text>
        <FlatList
          data={managers}
          renderItem={({ item, index }) => (
            <ManagerListItem
              data={item}
              onPress={_handlePressUserItem}
              isSelected={selectedManager && selectedManager.id === item.id}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.requestButton}
          onPress={_handleRequestAccess}>
          <Text style={styles.requestButtonText}>Request Access</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(ManagerHomeScreen);
