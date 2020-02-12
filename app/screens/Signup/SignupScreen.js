import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Api, JsonRpc, RpcError } from 'eosjs-rn';
import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';
import { TextEncoder, TextDecoder } from 'text-encoding';

import ecc from 'eosjs-ecc-rn';

import _ from 'lodash';

import styles from './SignupScreen.style';
import { rpc, api, setSignatureProvider } from '../../utilities/eos';
import { connectUser } from '../../redux/modules';

const SignupScreen = props => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const {
    navigation: { navigate },
  } = props;

  const _handleSignup = async () => {
    const privateKey = await ecc.randomKey();
    const publicKey = ecc.privateToPublic(privateKey);

    console.log('Private key: ', privateKey);
    console.log('Public key: ', publicKey);

    // const signatureProvider = new JsSignatureProvider([
    //   '5JfZYEuiiDTBmyNBLTAjU4A8uBzrjFVU5cgKaiBLtF5TpwNQzNs',
    // ]);
    // setSignatureProvider(signatureProvider);

    // const rpc = new JsonRpc('http://testnet.telos.eostribe.io');
    // const api = new Api({
    //   rpc,
    //   signatureProvider,
    //   textDecoder: new TextDecoder(),
    //   textEncoder: new TextEncoder(),
    // });

    // try {
    //   const result = await api.transact(
    //     {
    //       actions: [
    //         {
    //           account: 'productloger',
    //           name: 'addmanager',
    //           authorization: [
    //             {
    //               actor: 'productloger',
    //               permission: 'active',
    //             },
    //           ],
    //           data: {
    //             manager: 'juliafodor12',
    //             description: 'manager 3',
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       blocksBehind: 3,
    //       expireSeconds: 30,
    //     },
    //   );

    //   console.log(result);
    // } catch (err) {
    //   console.log('Transaction error', err);
    // }

    const accountName = 'productusr28';

    const profile = {
      fullName: 'Eugene Luzgin',
      accountName,
      publicKey,
      phoneNumber: '+1234567890',
    };

    try {
      const result = await rpc.get_table_rows({
        json: true,
        code: 'productloger',
        scope: 'productloger',
        table: 'user',
      });
      console.log('existing users', result);
      props.setUsers(result.rows);

      const user = _.find(result.rows, { id: accountName });
      console.log('me', user);

      if (!user) {
        props.setProfile({ ...profile, role: 'Guest' });
        navigate('Guest');
      } else if (user.id === user.manager) {
        props.setProfile({ ...profile, role: 'Manager' });
        navigate('Manager');
      } else {
        props.setProfile({ ...profile, role: 'User' });
        navigate('User');
      }
    } catch (err) {
      console.log('get users error', err);
    }

    // props.navigation.navigate('User');
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
    </SafeAreaView>
  );
};

export default connectUser()(SignupScreen);
