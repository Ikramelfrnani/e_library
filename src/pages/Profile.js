//Profile.js

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import SideMenu from "../Components/SideMenu";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import { Modifier, Supprimer } from "../features/UsersSlice";
import { useRef} from "react";
const Container = styled.div`
    width: 35%;
    height: 500px;
    background-color: #191c29;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: content-box;
    position: absolute;
    top: 150px;
    left: 530px;
    flex-direction:column;
    align-items:center;

    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:10px;
        width:50%;
        margin-top:25px;
    }
    label:not(.label) {
        width: 100%;
        padding:6px;
        height: 30px;
        display: flex;
        align-items: center;
        background-color: #252b42;
        border-radius:50px;
        border: 1px solid rgba(0, 0, 0, 0.53);
    }
    .div{
        display: flex;
        flex-direction:column;
        width:100%;
        gap:10px;
        margin-left:-10px;
    }
    .div2{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color:rgb(61, 2, 61);
        margin-top:50px;

        h1{
            color:white;
            text-align:center;
        }
        
    }
    .label{
        width: 100%;
        padding:6px;
        height: 30px;
        display: flex;
        align-items: center;
        background-color:purple;
        border-radius:50px;
        border: 1px solid rgba(0, 0, 0, 0.24);
    }
    .input{
        color: white;
        width: 100%;
        background: none;
        border: none;
        outline:none;
        font-size:15px;
        font-weight:bold;
        letter-spacing:0.5px;
    }
    input:not(.input) {
        color: white;
        width: 100%;
        background: none;
        border: none;
        outline:none;
        padding-left: 18px;
    }
    h2{
        color: white;
        text-align: center;
        margin-top:50px;
    }
`
const Image=styled.img`
    width: 200px;
    height: 200px;
    position: absolute;
    top: -20px;
    left:110px;
`
export default function Profile(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    const users = useSelector((state) => state.users.users);
    const user = users.find(user => user.idUser == id);
    
    const isAuthenticated = useAuth();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    // if (!user) { 
    //     return <h1>User not found!</h1>;
    // }
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            dispatch(Supprimer({ idUser: user.idUser }));
            navigate("/");
        }
    };
    const handleEdit = (e) => {
        e.preventDefault();
        const updatedData = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        const emailChanged = updatedData.email !== user.email;
        const passwordChanged = updatedData.password !== user.password;
        dispatch(Modifier({ idUser: user.idUser, updatedData }));
        alert("Profile updated successfully!");
        if (emailChanged || passwordChanged) {
            alert("you will be redirected to login now");
            navigate('/login');
        }
    };
        return(
            <>
                <SideMenu id={id}/>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Image className="img" src="/pictures/thelogo-removebg-preview.png" alt="Logo" />
                    <Container>
                    { isAuthenticated && user ? (
                    <>
                        <div className="div2">
                            <h1>{user ? user.username[0].toUpperCase() : '?'}</h1>
                        </div>
                        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleEdit}>
                            <label>
                                <input type='text' name="Username" placeholder="Username"
                                defaultValue={user.username} ref={usernameRef} />
                            </label>

                            <label>
                                <input type='text' name="email"  placeholder="Email" 
                                defaultValue={user.email} ref={emailRef} />
                            </label>
                            <label>
                                <input type='password' name="password" placeholder="Password" 
                                defaultValue={user.password} ref={passwordRef} />
                            </label>
                            <div className="div">
                                <label className="label">
                                    <input type="submit" value="Edit" className="input"/>
                                </label>
                                <label className="label">
                                    <button type="button" value="Delete Account" className="input" onClick={handleDelete} >
                                        Delete Account
                                    </button>
                                </label>
                            </div>
                        </form>
                    </>
                ) : (
                    <h1 style={{
                        textAlign:'center', color:'white', marginTop:'200px'
                    }}>Create an account or login first</h1>
                )}

                    </Container>
                    
                </div>
            </>
        )
    }    
    