const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelPath: (id) => [apiPath, 'channels', `${id}`].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagePath: (id) => [apiPath, 'messages', `${id}`].join('/'),
  pages: {
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    chatPage: () => '/',
    notFoundPage: () => '*',
  },
};
