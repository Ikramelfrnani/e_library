import { useEffect, useState } from "react";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import BookCardflip from "./BookCardflip";
import { fetchBySubject } from "../features/BooksSubjectSlice";
import Loader from "./Loader";


const Container=styled.div`
    width: 95%;
    height: 400px;
    background-color: #191c29;
    margin-top:30px;
    margin-left:35px;
    display: flex;
    flex-direction:column;
    gap: 80px;
    box-sizing: content-box;
    // border:1px solid black;
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

    select,input{
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
    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        margin-left:25px;
    }
    .carousel {
        display: flex;
        gap: 20px;
        overflow: hidden;
        width: 90%;
    }
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px;
        color: white;
        z-index: 10;
    }
    .left {
        left: 10px;
    }

    .right {
        right: 50px;
    }
`
const Btn=styled.button`
    border:none;
    background: none;
    outline:none;

    img{
        width:20px;
        height:20px;
    }

`

export default function BooksFilters({id}) {
    const [selectedType, setSelectedType] = useState('horror');
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleBooks = 6;
    const { data: bookSubject, status, error } = useSelector((state) => state.bookSubject);
    useEffect(() => {
        dispatch(fetchBySubject(selectedType));
        setCurrentIndex(0);
      }, [selectedType]);
    const Types = [
        'horror','thriller','fiction', 'fantasy', 'romance', 'kids'
    ];

    const handleChange = (e) => {
        setSelectedType(e.target.value);
    };
    
    const getBookCover = (coverId) => {
        if (coverId) {
            return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }
        return '/pictures/Cover not found.png';
    };

    const nextSlide = () => {
        if (currentIndex + visibleBooks < bookSubject.length) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <Container>
            <form style={{display:'flex',width:'100%',gap:'10px'}}>
                <label>
                    <select value={selectedType} onChange={handleChange}>
                        {
                            Types.map((t, index) =>
                                <option key={index} value={t}>{t}</option>
                            )
                        }
                    </select>
                </label>
            </form>
            <div className="slider-container">
                {status === 'loading' && <Loader/>}
                {status === 'failed' && <p>{error}</p>}
                {status === 'succeeded' && bookSubject.length > 0 && (
                    <>
                    <button className="arrow left" onClick={prevSlide} disabled={currentIndex === 0}>
                        &#10094;
                    </button>

                    <div className="carousel">
                        {bookSubject.slice(currentIndex, currentIndex + visibleBooks).map((book, index) => (
                            <BookCardflip 
                                id={id}
                                key={index} 
                                book={book} 
                                coverUrl={getBookCover(book.cover_id)}
                            />
                        ))}
                    </div>

                    <button className="arrow right" onClick={nextSlide} disabled={currentIndex + visibleBooks >= bookSubject.length}>
                        &#10095;
                    </button>
                </>
            )}
        </div>
        </Container>
    );
}
