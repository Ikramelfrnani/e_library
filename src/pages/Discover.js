import React from 'react';
import SideMenu from '../Components/SideMenu';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import BooksFilters from '../Components/BooksFilters';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Discover() {
    const { id } = useParams();
    const users = useSelector((state) => state.users.users);
    const user = users.find(user => user.idUser == id);
    // console.log(user)
    const username = user ? user.username : "Reader";
    return(
        <>  
            <SideMenu id={id}/>
            <div style={{display:'flex',flexDirection:'column', width:'100%'}}>
                <Header id={id}/>
                <Banner username={username}/>
                <BooksFilters id={id}/>
            </div>
        </>
    )
}