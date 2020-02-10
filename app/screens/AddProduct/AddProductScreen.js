import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './AddProductScreen.style';

const AddProductScreen = props => {
  const {
    navigation: { navigate },
  } = props;

  const [barCodeData, setBarCodeData] = useState('');

  const _handleScan = () => {
    navigate('Scanner', { onBarCodeRead: _handleBarCodeRead });
  };

  const _handleBarCodeRead = data => {
    setBarCodeData(data);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Product</Text>
          </View>
          <View style={styles.formBody}>
            <Text style={styles.formLabel}>Product Name</Text>
            <TextInput style={[styles.formInput, styles.nameInput]} />
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.formInput, styles.descriptionInput]}
              multiline={true}
            />
            <Text style={styles.formLabel}>RFID Tag</Text>
            <TextInput
              style={[styles.formInput, styles.tagInput]}
              secureTextEntry={true}
              editable={false}
              value={barCodeData}
            />
            <TouchableOpacity
              style={[styles.button, styles.scanButton]}
              onPress={_handleScan}>
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

export default AddProductScreen;
