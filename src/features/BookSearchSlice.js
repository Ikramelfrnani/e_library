import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (term) => {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${term}&limit=20`);
    return response.data.docs;
});

const bookSearchSlice = createSlice({
    name: 'books',
    initialState: { 
        data: [], 
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
            
    },
});

export default bookSearchSlice.reducer;
