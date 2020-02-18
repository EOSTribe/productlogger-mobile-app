// @flow

const userState = {
  currentUser: {
    fullName: '',
    accountName: '',
    publicKey: '',
    phoneNumber: '',
    role: '',
  },
  users: [],
  products: [],
  requests: [],
};

export const defaultReducers = {
  userState,
};
