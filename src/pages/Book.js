import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import BookCard from "../Components/BookCard";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../features/likedBooksSlice";
import useAuth from "../hooks/useAuth";

const Container = styled.div`
    width: 50%;
    height: 600px;
    background-color: #191c29;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: content-box;
    position: absolute;
    top: 160px;
    left: 400px;

    h2, h5, h6{
        color: white;
        text-align: left;
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 50%;
    }
    
    h2 {
        position: absolute;
        left: 350px;
        top: 35px;
    }
    
    h5 {
        position: absolute;
        left: 350px;
        top: 100px;
    }
    
    .h5 {
        position: absolute;
        left: 350px;
        top: 130px;
    }
    
    .card {
        position: absolute;
        left: 100px;
        top: 50px;
    }
`;

const Btn = styled.button`
    border: none;
    outline: none;
    border-radius: 15px;
    margin-left: 10px;
    padding: 12px 10px;
    background: purple;
    cursor: pointer;
    color: white;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 1px;

    span {
        margin-left: 35px;
    }
`;

const Para = styled.div`
    position: absolute;
    left: 105px;
    top: 320px;
    color: white;
    max-width: 80%;
    h3{
        color: white;
        text-align: left;
    }
    p {
        font-size: 16px;
        line-height: 1.5;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
`;

export default function Book() {
    const {id}=useParams();
    const location = useLocation();
    const book = location.state && location.state.book;
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const isAuthenticated = useAuth();
    const likedBooks = useSelector(state => state.likedBooks);
    const [description, setDescription] = useState("Loading description...");

    const isLiked = likedBooks.findIndex((b) => b.key === book.key) !== -1;

    useEffect(() => {
        if (!book || !book.key) return;

        const fetchDescription = async () => {
            try {
                const response = await fetch(`https://openlibrary.org${book.key}.json`);
                const data = await response.json();
                setDescription(
                    (data.description && data.description.value) || 
                    data.description || "No description available."
                  );                  
            } catch (error) {
                setDescription("Failed to load description.");
                console.error("Error fetching book data:", error);
            }
        };

        fetchDescription();
    }, [book]);
    const handleDownload = async () => {
        if(!isAuthenticated){
            alert("You need to log in to download books.");
            navigate('/login');
            return null;
        }
        const authorName = (book.authors && book.authors[0] && book.authors[0].name) || 
                   (book.author_name && book.author_name[0]) ||  "Unknown Author";

        if (!book || !book.title || !authorName) {
            console.error("Book details are missing.");
            return;
        }
        const searchUrl = `https://annas-archive-api.p.rapidapi.com/search?q=${book.title}&author=${authorName}&skip=0&source=libgenLi%2C%20libgenRs`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "d5ea5ef511msh1d60539e12b4f1ap1f4adfjsn7da53c26449c",
                "x-rapidapi-host": "annas-archive-api.p.rapidapi.com",
            },
        };
    
        try {
            const response = await fetch(searchUrl, options);
            const result = await response.json();
    
            if (!result.books || result.books.length === 0) {
                alert("This book is currently unavailable for download.");
                return;
            }
            alert('Your download is starting soon');
            const md5 = result.books[0].md5;
            
            const downloadUrl = `https://annas-archive-api.p.rapidapi.com/download?md5=${md5}`;
            const downloadResponse = await fetch(downloadUrl, options);
            const downloadResult = await downloadResponse.json();
    
            if (!downloadResult || !downloadResult[0]) {
                console.error("Download URL not found.");
                return;
            }
    
            const fileURL = downloadResult[0];
            console.log("Download URL:", fileURL);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "book.pdf";
            document.body.appendChild(alink);
            alink.click();
            document.body.removeChild(alink);
    
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    
    const handleHeartClick = () => {
        if (isAuthenticated) {
            dispatch(toggleLike(book));
          } else {
            alert("You need to log in to save books to favorites.");
            navigate('/login');
          }
    };

    return (
        <>
            <SideMenu id={id}/>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Header id={id}/>
                <Container>
                    <BookCard 
                        book={book} 
                        coverUrl={`https://covers.openlibrary.org/b/id/${book.cover_id || book.cover_i}-L.jpg`}
                    />
                    <h2>{book.title}</h2>
                    <h5>By {book.authors?.[0]?.name || book.author_name?.[0] || "Unknown Author"}</h5>
                    <h5 className="h5">First published in : {book.first_publish_year || "Unknown Year"}</h5>
                    <div
                        style={{ position: 'absolute', left: '340px', top: '250px', display: 'flex' }}
                    >
                        <Btn onClick={handleDownload} style={{cursor: isAuthenticated ? "pointer" : "not-allowed"}}>
                            <img src="/pictures/download.png"  
                                style={{ width: '25px', height: '25px', position: 'absolute', left: '25px', top: '9px' }}
                            />
                            <span>Download</span>
                        </Btn>
                        <FaHeart 
                            className="heart-icon" 
                            color={isLiked ? '#E9444D' : 'gray'} 
                            size={32} 
                            onClick={handleHeartClick} 
                            style={{
                                position: 'absolute',
                                left: '180px',
                                top: '6px',
                                cursor: isAuthenticated ? "pointer" : "not-allowed"
                                
                            }}
                        />
                    </div>
                    <Para>
                        <h3>Description</h3>
                        <p>{description}</p>
                    </Para>
                </Container>
            </div>
        </>
    );
}
