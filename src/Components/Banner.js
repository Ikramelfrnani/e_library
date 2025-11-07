import CardSlide from "./CardSlide";
import TextAnime from "./TextAnime";
import styled from 'styled-components';

const Container=styled.div`
    width: 95%;
    height: 400px;
    background-color: #191c29;
    overflow: hidden;
    margin-top:30px;
    margin-left:35px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: content-box;
`

export default function Banner({username}) {
  return (
    <Container>
      <CardSlide />
      <TextAnime username={username}/>
    </Container>
  );
}
