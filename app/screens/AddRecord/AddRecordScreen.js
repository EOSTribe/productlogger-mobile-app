import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './AddRecordScreen.style';

const AddRecordScreen = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Record</Text>
          </View>
          <View style={styles.formBody}>
            <Text style={styles.formLabel}>Record Description</Text>
            <TextInput
              style={[styles.formInput, styles.descriptionInput]}
              multiline={true}
            />
            <Text style={styles.formLabel}>RFID Tag</Text>
            <TextInput
              style={[styles.formInput, styles.tagInput]}
              secureTextEntry={true}
            />
            <TouchableOpacity style={[styles.button, styles.scanButton]}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddRecordScreen;
