import { createSlice } from "@reduxjs/toolkit";

const likedBooksSlice = createSlice({
  name: "likedBooks",
  initialState: [],
  reducers: {
    toggleLike: (state, action) => {
      const book = action.payload;
      const index = state.findIndex((b) => b.key === book.key);

      if (index !== -1) {
        return state.filter((b) => b.key !== book.key);
      } else {
        return [...state, book];
      }
    },
  },
});

export const { toggleLike } = likedBooksSlice.actions;
export default likedBooksSlice.reducer;
