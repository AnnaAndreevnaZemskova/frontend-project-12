import filter from 'leo-profanity';

export const selectRollbarConfig = () => ({
  accessToken: import.meta.env.REACT_APP_ROLLBAR_POST_CLIENT_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export const selectProfanityFilter = () => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  return filter;
};
