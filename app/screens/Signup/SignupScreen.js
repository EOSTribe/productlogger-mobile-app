import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Keychain from 'react-native-keychain';

import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';

import ecc from 'eosjs-ecc-rn';

import _ from 'lodash';

import styles from './SignupScreen.style';
import {
  setSignatureProvider,
  getTableRows,
  addManager,
} from '../../utilities/eos';
import { connectUser, promisify } from '../../redux/modules';

const SignupScreen = props => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const {
    navigation: { navigate },
  } = props;

  useEffect(() => {
    _loadKeychain();
    // _addManager('eumnxtqleuew', 'Manager 1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _loadKeychain = async () => {
    const credentials = await Keychain.getGenericPassword();
    console.log('Keychain credentials', credentials);

    if (!credentials) {
      return;
    }

    const privateKey = credentials.password;
    const publicKey = ecc.privateToPublic(privateKey);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    setSignatureProvider(signatureProvider);

    const profile = {
      accountName: credentials.username,
      publicKey,
    };
    _getUsersAndNavigate(profile);
  };

  const _handleSignup = async () => {
    if (!fullName || !phoneNumber || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const privateKey = await ecc.randomKey();
    const publicKey = ecc.privateToPublic(privateKey);

    console.log('Private key: ', privateKey);
    console.log('Public key: ', publicKey);

    setSpinnerVisible(true);

    try {
      const signupRes = await promisify(props.signup, {
        full_name: fullName,
        cell_phone: phoneNumber,
        public_key: publicKey,
      });

      console.log('Sign up response', signupRes);
      setSpinnerVisible(false);

      const accountName = signupRes.chain_name;
      await Keychain.setGenericPassword(accountName, privateKey);

      const signatureProvider = new JsSignatureProvider([privateKey]);
      setSignatureProvider(signatureProvider);

      const profile = {
        fullName,
        accountName,
        publicKey,
        phoneNumber,
      };

      _getUsersAndNavigate(profile);
    } catch (err) {
      console.log('Sign up error', err);
      setSpinnerVisible(false);
    }
  };

  const _getUsersAndNavigate = async profile => {
    try {
      const result = await getTableRows('user');
      console.log('existing users', result);
      props.setUsers(result.rows);

      const user = _.find(result.rows, { id: profile.accountName });
      console.log('me', user);

      if (!user) {
        props.setProfile({ ...profile, role: 'Guest' });
        navigate('Guest');
      } else if (user.id === user.manager) {
        props.setProfile({
          ...profile,
          role: 'Manager',
          managerName: user.manager,
        });
        navigate('Manager');
      } else {
        props.setProfile({
          ...profile,
          role: 'User',
          managerName: user.manager,
        });
        navigate('User');
      }
    } catch (err) {
      console.log('get users error', err);
    }
  };

  const _addManager = async (accountName, description) => {
    const privateKey = 'master-private-key';
    const signatureProvider = new JsSignatureProvider([privateKey]);
    setSignatureProvider(signatureProvider);

    try {
      const result = await addManager(accountName, description);

      console.log('add manager result', result);
    } catch (err) {
      console.log('add manager error', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Full Name'}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder={'Phone number'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={_handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(SignupScreen);
