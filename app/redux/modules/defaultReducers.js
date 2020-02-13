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
};

export const defaultReducers = {
  userState,
};
