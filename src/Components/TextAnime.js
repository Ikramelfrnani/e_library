import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin-left:50px;
  .card {
    background-color: transparent;
    padding: 1rem 2rem;
    border-radius: 1.25rem;
    margin-left:50px;
    margin-top:-20px;
  }
  .loader {
    color: rgb(124, 124, 124);
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 35px;
    box-sizing: content-box;
    height: 40px;
    padding: 10px 10px;
    display: flex;
    border-radius: 8px;
  }

  .words {
    overflow: hidden;
    position: relative;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 20;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: white;
    animation: Textspin 4s infinite;
  }

  @keyframes Textspin {
    10% {
      transform: translateY(-102%);
    }

    25% {
      transform: translateY(-100%);
    }

    35% {
      transform: translateY(-202%);
    }

    50% {
      transform: translateY(-200%);
    }

    60% {
      transform: translateY(-302%);
    }

    75% {
      transform: translateY(-300%);
    }

    85% {
      transform: translateY(-402%);
    }

    100% {
      transform: translateY(-400%);
    }
  }`;
  const Title=styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 35px;
    color:white;
    margin-left:93px;
    margin-top:80px;
  `

const TextAnime = ({username}) => {
  const phrases=[
      "Discover your favorite books !",
      "Search, Save, Download !",
      "Endless books, endless stories !",
      "Your next adventure awaits !",
      "Discover your favorite book !"
  ]
  return (
    <>
    <StyledWrapper>
      <Title>Welcome {username} !</Title>
      <div className="card">
        <div className="loader">
          <div className="words">
            {
                phrases.map(p =>
                    <span className="word">{p}</span>
                )
            }
          </div>
        </div>
      </div>
    </StyledWrapper>
    </>
  );
}
export default TextAnime;
