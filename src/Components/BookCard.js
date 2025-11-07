import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .card {
    background: none;
    width: 190px;
    height: 254px;
    perspective: 1000px;
    font-family: sans-serif;
    overflow: hidden;
    border: 1px solid rgba(128, 128, 128, 0.2);
    border-radius: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
`;

const BookCard = ({ book,coverUrl }) => {
  return (
    <StyledWrapper>
      <div className="card">
      <img src={coverUrl} alt={book.title} />
      </div>
    </StyledWrapper>
  );
};

export default BookCard;
