import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ecc from 'eosjs-ecc-rn';

import styles from './SignupScreen.style';

const SignupScreen = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleSignup = async () => {
    const privateKey = await ecc.randomKey();
    const publicKey = ecc.privateToPublic(privateKey);

    console.log('Private key: ', privateKey);
    console.log('Public key: ', publicKey);

    // props.navigation.navigate('Manager');
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
          placeholder={'Email'}
          value={email}
          onChangeText={setEmail}
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
    </SafeAreaView>
  );
};

export default SignupScreen;
