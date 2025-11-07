import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import BookCardflip from "../Components/BookCardflip";
import { useParams } from "react-router-dom";

const Container = styled.div`
    width: 95%;
    min-height: 400px;
    background-color: #191c29;
    margin-top: 30px;
    margin-left: 50px;
    box-sizing: content-box;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
`;

export default function Favorite() {
    const {id}=useParams();
    const likedBooks = useSelector((state) => state.likedBooks);
    const getBookCover = (book) => {
        const coverId = book.cover_id || book.cover_i;
        if (coverId) {
            return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }
        return '/pictures/Cover not found.png';
    };
    return (
        <>
            <SideMenu id={id}/>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Header id={id}/>
                <Container>
                    {likedBooks.length > 0 ? (
                        likedBooks.map((book) => (
                            <BookCardflip 
                                id={id}
                                key={book.key} 
                                book={book} 
                                coverUrl={getBookCover(book)}
                            />
                        ))
                    ) : (
                        <h2 style={{ color: 'white' }}>No favorite books added yet.</h2>
                    )}
                </Container>
            </div>
        </>
    );
}
