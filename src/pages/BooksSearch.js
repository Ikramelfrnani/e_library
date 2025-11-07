import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/BookSearchSlice';
import BookCardflip from '../Components/BookCardflip';
import { useParams } from "react-router-dom";
import SideMenu from '../Components/SideMenu';
import Header from "../Components/Header";
import styled from "styled-components";
import Loader from "../Components/Loader";

const Container = styled.div`
    width: 95%;
    height: 400px;
    background-color: #191c29;
    margin-top: 30px;
    margin-left: 70px;
    box-sizing: content-box;

    label {
        width: 10%;
        padding:6px;
        height: 30px;
        display: flex;
        align-items: center;
        background-color: #252b42;
        border-radius:50px;
        border: 1px solid rgba(0, 0, 0, 0.53);
        overflow:hidden;
    }

    input{
        color: white;
        background: none;
        width:95%;
        border: none;
        outline:none;
        padding:10px;
        height: 40px;
        background-color: #252b42;
    }
    .filter{
        position: absolute;
        padding-left:100px;
        padding-top:5px;
    }
`;

const Btn = styled.button`
    border: none;
    background: none;
    outline: none;
    cursor:pointer;
    img {
        width: 20px;
        height: 20px;
    }
`;

export default function BooksSearch() {
    const { term, id } = useParams();
    const dispatch = useDispatch();
    const { data: bookSearch, status, error } = useSelector((state) => state.bookSearch);
    const [yearFilter, setYearFilter] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(bookSearch);

    useEffect(() => {
        if (term) {
            dispatch(fetchBooks(term));
        }
    }, [dispatch, term]);

    useEffect(() => {
        setFilteredBooks(bookSearch);
    }, [bookSearch]);

    const getBookCover = (coverId) => {
        if (coverId) {
            return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }
        return '/pictures/Cover not found.png';
    };

    const handleFilterClick = () => {
        if (yearFilter) {
            const filtered = bookSearch.filter(book => book.first_publish_year === parseInt(yearFilter));
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(bookSearch);
        }
    };
    const likedBooks = useSelector(state => state.likedBooks);
    
    useEffect(() => {
        console.log("Liked Books:", likedBooks);
    }, [likedBooks]);

    return (
        <>
            <SideMenu id={id}/>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Header id={id}/>
                <Container>
                    <label>
                        <input
                            type="text"
                            placeholder="by year"
                            maxLength="4"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        />
                        <div className="filter">
                            <Btn onClick={handleFilterClick}><img src={'/pictures/filter.png'} /></Btn>
                        </div>
                    </label>
                    {status === 'loading' && <Loader />}
                    {status === 'failed' && <p>{error}</p>}
                    {status === 'succeeded' && filteredBooks.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop:'30px'}}>
                            {filteredBooks.map((book, index) => (
                                <BookCardflip
                                    id={id}
                                    key={index}
                                    book={book}
                                    coverUrl={getBookCover(book.cover_i)}
                                />
                            ))}
                        </div>
                    ): (
                        <p style={{ color: 'white', marginLeft:'580px', marginTop: '60px' }}>No books were found</p>
                    )}
                </Container>
            </div>
        </>
    );
}