import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './AddUserScreen.style';

const AddUserScreen = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New User</Text>
          </View>
          <View style={styles.formBody}>
            <Text style={styles.formLabel}>Username</Text>
            <TextInput style={styles.formInput} />
            <Text style={styles.formLabel}>Description</Text>
            <TextInput style={styles.formInput} />
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

export default AddUserScreen;