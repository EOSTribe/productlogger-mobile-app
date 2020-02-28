import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Toast from 'react-native-root-toast';
import _ from 'lodash';

import styles from './ManagerHomeScreen.style';
import UserProfileView from '../../components/UserProfileView';
import { SECONDARY_GRAY_TEXT, DARK_GRAY_BACK } from '../../theme/colors';
import { connectUser, promisify } from '../../redux/modules';
import { getTableRows } from '../../utilities/eos';

const UserListItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Icon name={'ios-person'} color={SECONDARY_GRAY_TEXT} size={20} />
        <Text style={styles.listItemText}>
          {data.id} [{data.description}]
        </Text>
        <Icon name="ios-arrow-forward" color={SECONDARY_GRAY_TEXT} size={20} />
      </View>
    </TouchableOpacity>
  );
};

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

const RequestListItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <Icon name={'ios-person'} color={SECONDARY_GRAY_TEXT} size={20} />
        <Text style={styles.listItemText}>{data.user_name}</Text>
        <Icon
          name={'ios-arrow-forward'}
          color={SECONDARY_GRAY_TEXT}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

const _renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.tabBarIndicator}
    style={{ backgroundColor: DARK_GRAY_BACK }}
  />
);

const ManagerHomeScreen = props => {
  const {
    navigation: { navigate },
    userState: { users, products, requests, currentUser },
  } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: 'users', title: 'Users' },
    { key: 'products', title: 'Products' },
    { key: 'requests', title: 'Requests' },
  ]);
  const [managedUsers, setManagedUsers] = useState([]);
  const [managedProducts, setManagedProducts] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const UsersView = () => {
    return (
      <View style={styles.tabView}>
        <FlatList
          data={managedUsers}
          renderItem={({ item, index }) => (
            <UserListItem data={item} onPress={_handlePressUserItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigate('AddUser', { onBack: _loadUsers })}>
          <Text style={styles.addButtonText}>Add new user</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ProductsView = () => {
    return (
      <View style={styles.tabView}>
        <FlatList
          data={managedProducts}
          renderItem={({ item, index }) => (
            <ProductListItem data={item} onPress={_handlePressProductItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const RequestsView = () => {
    return (
      <View style={styles.tabView}>
        <FlatList
          data={activeRequests}
          renderItem={({ item, index }) => (
            <RequestListItem data={item} onPress={_handlePressRequestItem} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    users: UsersView,
    products: ProductsView,
    requests: RequestsView,
  });

  const _handlePressUserItem = data => {
    navigate('UserDetail', { user: data, onBack: _loadUsers });
  };

  const _handlePressProductItem = data => {
    navigate('ProductDetail', { product: data, readOnly: true });
  };

  const _handlePressRequestItem = data => {
    navigate('AddUser', { request: data, onBack: _loadUsers });
  };

  useEffect(() => {
    _loadProducts();
    _loadAccessRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = _.filter(
      users,
      item =>
        currentUser.accountName === item.manager && item.manager !== item.id,
    );
    setManagedUsers(filtered);
  }, [currentUser.accountName, users]);

  useEffect(() => {
    const filtered = _.filter(products, item => {
      return _.find(
        item.owners,
        owner => owner.owner === currentUser.accountName,
      );
    });
    setManagedProducts(filtered);
  }, [currentUser.accountName, products]);

  useEffect(() => {
    const filtered = _.filter(requests, item => {
      return !_.find(managedUsers, user => user.id === item.user_name);
    });
    setActiveRequests(filtered);
  }, [requests, managedUsers]);

  const _loadUsers = async () => {
    setSpinnerVisible(true);

    try {
      const result = await getTableRows('user');
      console.log('existing users', result.rows);
      setSpinnerVisible(false);
      props.setUsers(result.rows);
    } catch (err) {
      Toast.show(err.message || 'Something went wrong');
      setSpinnerVisible(false);
    }
  };

  const _loadProducts = async () => {
    setSpinnerVisible(true);

    try {
      const result = await getTableRows('product');
      console.log('existing products', result.rows);
      setSpinnerVisible(false);
      props.setProducts(result.rows);
    } catch (err) {
      Toast.show(err.message || 'Something went wrong');
      setSpinnerVisible(false);
    }
  };

  const _loadAccessRequests = async () => {
    setSpinnerVisible(true);

    try {
      const result = await promisify(props.getAccessRequests, {
        managerName: currentUser.accountName,
      });
      console.log('access requets', result);
      setSpinnerVisible(false);
    } catch (err) {
      Toast.show(err.message || 'Something went wrong');
      setSpinnerVisible(false);
    }
  };

  const _handleTabIndexChange = index => {
    setTabIndex(index);

    if (index === 0) {
      _loadUsers();
    } else if (index === 1) {
      _loadProducts();
    } else if (index === 2) {
      _loadAccessRequests();
    }
  };

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
        <TabView
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderScene}
          onIndexChange={_handleTabIndexChange}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={_renderTabBar}
        />
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

export default connectUser()(ManagerHomeScreen);
