import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 60px;
  height: 100vh;
  background-color: #191c29;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  transition: width 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;

  &:hover {
    width: 200px;
    box-shadow: 6px 0px 15px rgba(0, 0, 0, 0.6);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 100px 0 0 8px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
    width: 83%;

    &:hover {
      background-color: #252b42;
    }
  }

  img {
    width: 25px;
    height: 25px;
  }
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 15px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${Container}:hover & {
        opacity: 1;
    }
`;


export default function SideMenu({id}) {
    return (
        <Container>
            <ul>
                <li>
                    <img src="/pictures/icons8-home-48.png" alt="Home Icon" />
                    <StyledLink to={`/discover/${id}`}>Home</StyledLink>
                </li>
                <li>
                    <img src="/pictures/icons8-favorite-48.png" alt="Favorite Icon" />
                    <StyledLink to={`/favorite/${id}`}>Favorite</StyledLink>
                </li>
                <li>
                    <img src="/pictures/icons8-user-48.png" alt="Profile Icon" />
                    <StyledLink to={`/profil/${id}`}>Profile</StyledLink>
                </li>
                <li style={{ marginTop: "350px" }}>
                    <img src="/pictures/logoutt.png" alt="Logout Icon" style={{ marginLeft: "4px" }} />
                    <StyledLink to="/logout">Logout</StyledLink>
                </li>
            </ul>
        </Container>
    );
}
