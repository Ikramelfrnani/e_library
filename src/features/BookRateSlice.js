import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookByRate = createAsyncThunk('books/fetchBookByRate', async () => {
    const response = await axios.get(`https://openlibrary.org/people/mekBot/books/want-to-read.json?limit=5`);
    return response.data.reading_log_entries
});


const bookRateSlice = createSlice({
    name: 'books',
    initialState: { 
        data: [], 
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookByRate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookByRate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBookByRate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default bookRateSlice.reducer;
