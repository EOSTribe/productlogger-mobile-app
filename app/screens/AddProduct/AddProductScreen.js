import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-root-toast';

import styles from './AddProductScreen.style';
import Spinner from 'react-native-loading-spinner-overlay';
import { logProduct } from '../../utilities/eos';
import { connectUser } from '../../redux/modules';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddProductScreen = props => {
  const {
    navigation: { navigate, goBack, getParam },
    userState: { currentUser },
  } = props;

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [barCodeData, setBarCodeData] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const _handleScan = () => {
    navigate('Scanner', { onBarCodeRead: _handleBarCodeRead });
  };

  const _handleBarCodeRead = data => {
    setBarCodeData(data);
  };

  const _handleSave = async () => {
    if (!productName || !description || !barCodeData) {
      Alert.alert('Please fill in all fields');
      return;
    }

    setSpinnerVisible(true);

    try {
      const result = await logProduct(
        currentUser.accountName,
        productName,
        description,
        barCodeData,
      );

      console.log('log product result', result);
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
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.innerContainer}>
          <Text style={styles.formLabel}>Product Name</Text>
          <TextInput
            style={[styles.formInput, styles.nameInput]}
            value={productName}
            onChangeText={setProductName}
          />
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={[styles.formInput, styles.descriptionInput]}
            multiline={true}
            value={description}
            onChangeText={setDescription}
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
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={_handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={spinnerVisible} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default connectUser()(AddProductScreen);
