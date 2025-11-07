import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .form {
    font-size: 0.9rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width:35%;
    position: relative;
    margin-left: 580px;
  }
  label {
    width: 100%;
    padding:6px;
    height: 30px;
    display: flex;
    align-items: center;
    background-color: #252b42;
    border-radius:50px;
    border: 1px solid rgba(0, 0, 0, 0.53);
  }

  .search{
    position: absolute;
    padding-left:10px;
  }
  .input {
    color: white;
    width: 100%;
    background: none;
    border: none;
    outline:none;
    padding-left:45px;
  }
`
const Btn=styled.button`
    border:none;
    background: none;
    outline:none;
    cursor:pointer;
    img{
        width:20px;
        height:20px;
    }

`
const SearchButton = ({id}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/searchbooks/${searchTerm}/${id}`);
  };
  
  return (
    <StyledWrapper>
      <form className="form">
        <label htmlFor="search">
          <input className="input" type="text"  placeholder="search by title or author" 
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="search">
            <Btn onClick={handleClick}><img src={'/pictures/search.png'}/></Btn>
          </div>
        </label>
      </form>
    </StyledWrapper>
  );
}

export default SearchButton;
