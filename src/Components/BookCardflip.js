import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../features/likedBooksSlice";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 190px;
    height: 254px;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid rgba(128, 128, 128, 0.08);
    border-radius: 1rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  .flip-card-back {
    background-color: #252b42;
    color: white;
    transform: rotateY(180deg);
    position:relative;
  }

  .title {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin-top:-15px;
  }

  .para1 {
    font-size: 12px;
    margin-bottom:30px;
    margin-top:0px;
  }

  .para2 {
    font-size: 12px;
    margin-top:-10px;
    color:#E9444D;
  }

  .heart-icon {
    cursor: ${(props) => (props.isAuthenticated ? "pointer" : "not-allowed")};
    position: absolute;
    top: 10px;
    left: 150px;
    color: ${(props) => (props.isAuthenticated ? (props.isLiked ? '#E9444D' : 'gray') : 'gray')};
  }

  button {
    background: purple;
    border: none;
    outline: none;
    border-radius: 1rem;
    color: white;
    padding: 5px;
    width: 50%;
    position: absolute;
    bottom: 40px;
    left: 50px;
    cursor: pointer;
  }
`;

const BookCardflip = ({ book, coverUrl, id}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedBooks = useSelector((state) => state.likedBooks);
  const isAuthenticated = useAuth();

  const isLiked = likedBooks.findIndex((b) => b.key === book.key) !== -1;

  const handleHeartClick = () => {
    if (isAuthenticated) {
      dispatch(toggleLike(book));
    } else {
      alert("You need to log in to save books to favorites.");
      navigate('/login');
    }
  };

  const authorName = (book.authors && book.authors[0] && book.authors[0].name) || 
  (book.author_name && book.author_name[0]) || "Unknown Author";


  const handleClick = () => {
    navigate(`/book/${id}`, { state: { book } });
  };

  return (
    <StyledWrapper isAuthenticated={isAuthenticated} isLiked={isLiked} >
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={coverUrl} alt={book.title} />
          </div>
          <div className="flip-card-back">
            <FaHeart
              className="heart-icon"
              size={24}
              onClick={handleHeartClick}
            />
            <p className="title">{book.title}</p>
            <p className="para1">{authorName}</p>
            <p className="para2">{book.first_publish_year || "Unknown Year"}</p>
            <button onClick={handleClick}>See Info</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default BookCardflip;
