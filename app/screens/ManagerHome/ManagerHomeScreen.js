import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './ManagerHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { DARK_GRAY_BACK } from '../../theme/colors';

const UserListItem = props => {
  const { data } = props;
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <Image style={styles.listItemImage} />
        <Text style={styles.listItemText}>{data.username}</Text>
      </View>
    </TouchableOpacity>
  )
};
const ManagerHomeScreen = props => {
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView data={managerData} style={styles.profileView} />
        <Text style={styles.listTitleText}>Users</Text>
        <FlatList
          data={users}
          renderItem={({ item, index }) => <UserListItem data={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add new user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

export default ManagerHomeScreen;