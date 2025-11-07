import { configureStore } from '@reduxjs/toolkit';
import bookSearchReducer from '../features/BookSearchSlice';
import bookSubjectReducer from '../features/BooksSubjectSlice';
import bookRateReducer from '../features/BookRateSlice';
import likedBooksReducer from "../features/likedBooksSlice";
import UsersReducer from "../features/UsersSlice";

const store = configureStore({
    reducer: {
        bookSearch: bookSearchReducer,
        bookSubject: bookSubjectReducer,
        bookRate: bookRateReducer,
        likedBooks: likedBooksReducer,
        users: UsersReducer,
    },
});

export default store;
