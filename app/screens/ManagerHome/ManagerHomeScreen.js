import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './ManagerHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { SECONDARY_GRAY_TEXT } from '../../theme/colors';

const UserListItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Image style={styles.listItemImage} />
        <Text style={styles.listItemText}>{data.username}</Text>
        <Icon name="ios-arrow-forward" color={SECONDARY_GRAY_TEXT} />
      </View>
    </TouchableOpacity>
  )
};
const ManagerHomeScreen = props => {
  const {
    navigation: { navigate }
  } = props;

  const managerData = {
    username: 'brunostebani',
    image: '',
    role: 'Manager',
  };

  const users = [
    {
      username: 'johndoeuser',
      role: 'User',
    },
    {
      username: 'maryhopkins',
      role: 'User',
    },
    {
      username: 'jerrybengaly',
      role: 'User',
    },
    {
      username: 'emilydo',
      role: 'User',
    },
  ];

  const _handlePressUserItem = (data) => {
    navigate('UserDetail', { user: data });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView data={managerData} style={styles.profileView} />
        <Text style={styles.listTitleText}>Users</Text>
        <FlatList
          data={users}
          renderItem={({ item, index }) => <UserListItem data={item} onPress={_handlePressUserItem} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigate('AddUser')}>
          <Text style={styles.addButtonText}>+ Add new user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

export default ManagerHomeScreen;