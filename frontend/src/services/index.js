import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from './messagesSlice.js';
import channelsSlice from './channelsSlice.js';
import authSlice from './authSlice.js';
import uiSlice from './uiSlice.js';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;