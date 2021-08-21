import { createSlice } from "@reduxjs/toolkit";

const initialPhotosState = {
  photosList: [],
  fetchPhotos: "https://jsonplaceholder.typicode.com/photos",
  loading: false,
  page: 0,
  prevY: 0,
};

const photosSlice = createSlice({
  name: "photos",
  initialState: initialPhotosState,
  reducers: {
    addPhotos(state, action) {
      state.photosList = [...action.payload, ...state.photosList];
    },
    setLoadingPhotos(state, action) {
      state.loading = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPrevY(state, action) {
      state.prevY = action.payload;
    },
  },
});

export default photosSlice.reducer;

export const photosActions = photosSlice.actions;
