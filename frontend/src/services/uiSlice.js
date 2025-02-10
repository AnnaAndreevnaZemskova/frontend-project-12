import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelAdapter = createEntityAdapter();

const initialState = {
  defaultChannelId: '1',
  currentChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
      defaultChannelId: '1',
    }),
  },
});

export const { setCurrentChannel } = uiSlice.actions;
export const selectors = defaultChannelAdapter.getSelectors(
  (state) => state.ui.defaultChannelId
);
export default uiSlice.reducer;
