import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from './UserHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { connectUser } from '../../redux/modules';
import { getTableRows } from '../../utilities/eos';
import { SECONDARY_GRAY_TEXT } from '../../theme/colors';

const ProductListItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Icon name={'ios-pricetags'} color={SECONDARY_GRAY_TEXT} size={20} />
        <Text style={styles.listItemText}>{data.productname}</Text>
        <Icon
          name={'ios-arrow-forward'}
          color={SECONDARY_GRAY_TEXT}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

const UserHomeScreen = props => {
  const {
    navigation: { navigate },
    userState: { currentUser, products },
  } = props;

  const [managedProducts, setManagedProducts] = useState([]);

  useEffect(() => {
    _loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _loadProducts = async () => {
    try {
      const result = await getTableRows('product');
      console.log('existing products', result.rows);
      props.setProducts(result.rows);
    } catch (err) {
      console.log('get products error', err);
    }
  };

  const _handlePressProductItem = data => {
    navigate('ProductDetail', { product: data, onBack: _loadProducts });
  };

  useEffect(() => {
    const filtered = _.filter(products, item => {
      console.log(item.owners);
      return _.find(
        item.owners,
        owner => owner.owner === currentUser.managerName,
      );
    });
    setManagedProducts(filtered);
  }, [currentUser, products]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView
          data={{
            title: currentUser.fullName,
            subTitle: currentUser.accountName,
            description: currentUser.role,
          }}
          style={styles.profileView}
        />
        <Text style={styles.listTitleText}>Products</Text>
        <FlatList
          data={managedProducts}
          renderItem={({ item, index }) => (
            <ProductListItem data={item} onPress={_handlePressProductItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('AddProduct', { onBack: _loadProducts })}>
          <Text style={styles.buttonText}>Add new product</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('AddRecord')}>
          <Text style={styles.buttonText}>Add record</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default connectUser()(UserHomeScreen);
