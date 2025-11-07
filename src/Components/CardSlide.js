import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styled from 'styled-components';
import { EffectCards } from 'swiper/modules';
import BookCard from './BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookByRate } from '../features/BookRateSlice';
import { useNavigate } from 'react-router-dom';


const AppContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-left:250px;
  margin-top:30px;
`;

const StyledSwiper = styled(Swiper)`
  width: 240px;
  height: 320px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  border-radius: 18px;
  background-color:transparent;
  width: 100px;
  height: 254px;
`;
const Text=styled.span`
  color:white;
  opacity:0.8;
  margin-top:-30px;
  font-size:18px;
  margin-left:280px;
`

export default function CardSlide() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { data: bookRate, status, error } = useSelector((state) => state.bookRate);
  useEffect(() => {
    dispatch(fetchBookByRate());
  }, []);
  const getBookCover = (coverId) => {
    if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }
    return '/pictures/Cover not found.png';
  };  
  // const handleClick = () => {
  //   navigate('/book');
  // };

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
    <AppContainer>
      <StyledSwiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        initialSlide={5}
      >
        {status === 'loading' && <p></p>}
        {status === 'failed' && <p>{error}</p>}
        {status === 'succeeded' && bookRate.length > 0 &&
          bookRate.map((book, index) => (
            <StyledSwiperSlide key={index}>
              <BookCard 
                book={book} 
                coverUrl={getBookCover(book.work.cover_id)}
              />
            </StyledSwiperSlide>
          ))
        }
      </StyledSwiper>
    </AppContainer>
    <Text>Popular Reads</Text>
    </div>
  );
}
