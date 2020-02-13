import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import moment from 'moment';

import styles from './ProductDetailScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { connectUser } from '../../redux/modules';
import { getTableRows } from '../../utilities/eos';
import { SECONDARY_GRAY_TEXT } from '../../theme/colors';

const RecordListItem = props => {
  const { data, onPress } = props;
  console.log(data);
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Icon name={'ios-document'} color={SECONDARY_GRAY_TEXT} size={20} />
        <Text style={styles.listItemText}>
          {data.description}, {moment(data.date_logged).format('MM/DD/YYYY')}
        </Text>
        <Icon
          name={'ios-arrow-forward'}
          color={SECONDARY_GRAY_TEXT}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

const ProductDetailScreen = props => {
  const {
    navigation: { navigate, getParam },
    userState: { products },
  } = props;

  const [product, setProduct] = useState(getParam('product'));
  const readOnly = getParam('readOnly');

  const _loadProducts = async () => {
    try {
      const result = await getTableRows('product');
      console.log('existing products', result.rows);
      props.setProducts(result.rows);
    } catch (err) {
      console.log('get products error', err);
    }
  };

  const _handlePressRecordItem = data => {
    // navigate('ProductDetail', { product: data, onBack: _loadProducts });
  };

  const _handleAddRecord = () => {
    navigate('AddRecord', { product, onBack: _loadProducts });
  };

  useEffect(() => {
    const updated = _.find(products, item => item.id === product.id);
    setProduct(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <UserProfileView
          data={{
            title: product.productname,
            subTitle: product.creator,
            description: `Tag: ${product.tag}`,
          }}
          style={styles.profileView}
        />
        <Text style={styles.listTitleText}>Records</Text>
        <FlatList
          data={product.records}
          renderItem={({ item, index }) => (
            <RecordListItem data={item} onPress={_handlePressRecordItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        {!readOnly && (
          <TouchableOpacity style={styles.button} onPress={_handleAddRecord}>
            <Text style={styles.buttonText}>Add record</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('AddRecord')}>
          <Text style={styles.buttonText}>Add record</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default connectUser()(ProductDetailScreen);
