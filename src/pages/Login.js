import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/UsersSlice";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
const Container = styled.div`
    width: 35%;
    height: 400px;
    background-color: #191c29;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: content-box;
    position: absolute;
    top: 100px;
    left: 500px;
    flex-direction:column;
    align-items:center;


    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:10px;
        width:50%;
        margin-top:-12px;
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
    h3{
        color: white;
        text-align: center;
        position: absolute;
        top:95px;
        
    }
    div{
        margin-top:15px;
        display:flex;
        gap:70px;
    }
    span{
        color:white;
    }
    Link{

    }
    
`
const Image=styled.img`
    width: 200px;
    height: 200px;
    margin-top:-30px;
`

export default function Login() {
    // const isAuthenticated=useAuth();
    // const {id}=useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    // if(isAuthenticated){
    //     navigate(`/${id}`);
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert('You must fill in all the fields.');
            return;
        }
        const user = users.find(us => us.email === email && us.password === password);
        if (user) {
            dispatch(login({ idUser: user.idUser }));
            navigate(`/discover/${user.idUser}`);
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <Container>
            <Image src="/pictures/thelogo-removebg-preview.png" alt="Logo" />
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type='text' 
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        
                    />
                </label>
                <label>
                    <input 
                        type='password' 
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <label className="label">
                <input type="submit" value="Login" className="input"/></label>
            </form>
            <div>
            <span>Don't have an account</span>
            <Link to={'/signup'}>Sign Up</Link>
            </div>
            
        </Container>
    );
}
