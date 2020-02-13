import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';

import styles from './ManagerHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { SECONDARY_GRAY_TEXT } from '../../theme/colors';
import { connectUser } from '../../redux/modules';
import { rpc } from '../../utilities/eos';

const UserListItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Image style={styles.listItemImage} />
        <Text style={styles.listItemText}>
          {data.id} [{data.description}]
        </Text>
        <Icon name="ios-arrow-forward" color={SECONDARY_GRAY_TEXT} />
      </View>
    </TouchableOpacity>
  );
};

const ManagerHomeScreen = props => {
  const {
    navigation: { navigate },
    userState: { users, currentUser },
  } = props;

  const [managedUsers, setManagedUsers] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const _handlePressUserItem = data => {
    navigate('UserDetail', { user: data, onBack: _reloadUsers });
  };

  useEffect(() => {
    const filtered = _.filter(
      users,
      item =>
        currentUser.accountName === item.manager && item.manager !== item.id,
    );
    setManagedUsers(filtered);
  }, [currentUser.accountName, users]);

  const _reloadUsers = async () => {
    setSpinnerVisible(true);

    try {
      const result = await rpc.get_table_rows({
        json: true,
        code: 'productloger',
        scope: 'productloger',
        table: 'user',
      });
      console.log('existing users', result);
      setSpinnerVisible(false);
      props.setUsers(result.rows);
    } catch (err) {
      console.log('get users error', err);
      setSpinnerVisible(false);
    }
  };

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
        <Text style={styles.listTitleText}>Users</Text>
        <FlatList
          data={managedUsers}
          renderItem={({ item, index }) => (
            <UserListItem data={item} onPress={_handlePressUserItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigate('AddUser', { onBack: _reloadUsers })}>
          <Text style={styles.addButtonText}>+ Add new user</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(ManagerHomeScreen);
