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
};

export const defaultReducers = {
  userState,
};
