export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
};

export const ERROR_MESSAGES = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  emptyUsername: 'Epic sadface: Username is required',
  emptyPassword: 'Epic sadface: Password is required',
};