import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    decrementPage(state) {
      state.page -= 1;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
