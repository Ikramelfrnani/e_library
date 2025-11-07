import React, { useState } from "react";
import styled from "styled-components";
import SearchButton from "./SearchButton";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 80px;
  box-sizing: content-box;
  width: 100%;
  margin-left: 30px;
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    margin-top: -50px;
  }

  .img {
    width: 200px;
    height: 200px;
  }

  .sign-up-btn {
    background-color: ${(props) => (props.isLoginHovered ? "none" : "purple")};
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 15px;
  margin-left: 10px;
  padding: 15px 20px;
  background: none;
  color: white;
  font-size: 18px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: purple;
  }
`;

const Item = styled.li`
  margin-left: 55px;

  .div2 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(61, 2, 61);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:50px;

    h1 {
      color: white;
      text-align: center;
    }
  }
`;

export default function Header({id}) {
  const navigate = useNavigate();
  const [isLoginHovered, setLoginHovered] = useState(false);
  const isAuthenticated = useAuth();
  const users = useSelector((state) => state.users.users);
  const user = users.find(user => user.idUser == id);
  const inscription = () => {
    navigate('/signup');
  };

  const Authenticate = () => {
    navigate('/login');
  };

  return (
    <Container isLoginHovered={isLoginHovered}>
      <ul>
        <li>
          <img className="img" src="/pictures/thelogo-removebg-preview.png" alt="Logo" />
        </li>
        <SearchButton id={id}/>
        <Item>
          {isAuthenticated ? (
            <div className="div2">
              <h1>{user ? user.username[0].toUpperCase() : '?'}</h1>
            </div>
          ) : (
            <>
              <Button
                className="log"
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
                onClick={Authenticate}
              >
                Login
              </Button>
              <Button className="sign-up-btn" onClick={inscription}>
                Sign Up
              </Button>
            </>
          )}
        </Item>
      </ul>
    </Container>
  );
}
