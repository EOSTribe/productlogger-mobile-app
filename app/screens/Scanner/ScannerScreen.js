import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

import styles from './ScannerScreen.style';

const ScannerScreen = props => {
  const { navigation } = props;

  const _handleBarcodeRead = ({ data }) => {
    const onBarCodeRead = navigation.getParam('onBarCodeRead');
    if (onBarCodeRead) {
      onBarCodeRead(data);
    }
    navigation.goBack();
  };

  return (
    <RNCamera
      captureAudio={false}
      style={styles.preview}
      onBarCodeRead={_handleBarcodeRead}
    />
  );
};

export default withNavigationFocus(ScannerScreen);
