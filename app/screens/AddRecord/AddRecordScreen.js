import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import styles from './AddRecordScreen.style';
import { connectUser } from '../../redux/modules';
import Spinner from 'react-native-loading-spinner-overlay';
import { logRecord } from '../../utilities/eos';

const AddRecordScreen = props => {
  const {
    navigation: { goBack, getParam },
    userState: { currentUser },
  } = props;

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [description, setDescription] = useState('');
  // const [productId, setProductId] = useState('');

  // const _handleScan = () => {
  //   navigate('Scanner', { onBarCodeRead: _handleBarCodeRead });
  // };

  // const _handleBarCodeRead = data => {
  //   setProductId(data);
  // };

  const _handleSave = async () => {
    if (!description) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const product = getParam('product');
    const onBack = getParam('onBack');

    setSpinnerVisible(true);

    try {
      const result = await logRecord(
        currentUser.accountName,
        product.id,
        description,
      );

      console.log('log record result', result);
      setSpinnerVisible(false);

      if (onBack) {
        onBack();
      }

      goBack();
    } catch (err) {
      console.log('log record error', err);
      setSpinnerVisible(false);
    }
  };

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
              value={description}
              onChangeText={setDescription}
            />
            {/* <Text style={styles.formLabel}>RFID Tag</Text>
            <TextInput
              style={[styles.formInput, styles.tagInput]}
              secureTextEntry={true}
              editable={false}
              value={productId}
            /> */}
            {/* <TouchableOpacity
              style={[styles.button, styles.scanButton]}
              onPress={_handleScan}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={_handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(AddRecordScreen);
