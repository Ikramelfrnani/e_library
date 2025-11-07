import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBySubject = createAsyncThunk('books/fetchBySubject', async (selectedType) => {
    const response = await axios.get(`https://openlibrary.org/subjects/${selectedType}.json?details=true&limit=50`);
    return response.data.works;
});


const booksSubjectSlice = createSlice({
    name: 'books',
    initialState: { 
        data: [], 
        status: 'idle', 
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBySubject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBySubject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBySubject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default booksSubjectSlice.reducer;
