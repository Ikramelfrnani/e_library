import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { Ajouter } from "../features/UsersSlice";
import styled from "styled-components";
const Container = styled.div`
    width: 35%;
    height: 460px;
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
    
`
const Image=styled.img`
    width: 200px;
    height: 200px;
    margin-top:-30px;
`
export default function SignUp(){
    const ref_username = useRef();
    const ref_email = useRef();
    const ref_password = useRef();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = ref_username.current.value.trim();
        const email = ref_email.current.value.trim();
        const password = ref_password.current.value.trim();

        if (username === "" || email === "" || password === "") {
            alert('Ypu must fill in all the fields');
            return;
        }
        
        const symb1 = email.indexOf('@');
        const symb2 = email.indexOf('.', symb1);
        if (symb1 === -1 || symb2 === -1) {
            alert('Email format is incorrect');
            return;
        }

        const user = users.find(user => user.username === username || user.email === email);

        if (user) {
            if (user.username === username) {
                alert("This username is already taken.");
            } else {
                alert("This email is already in use.");
            }
            return;
        }
        dispatch(Ajouter({ username, email, password }));
        alert('Account created successfully !');
        navigate(`/login`);
        ref_username.current.value = "";
        ref_email.current.value = "";
        ref_password.current.value = "";
    };

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    return (
        <Container>
            <Image src="/pictures/thelogo-removebg-preview.png" alt="Logo" />
            <h3>Sign up</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>
                    <input type='text' name="Username" ref={ref_username} placeholder="Username"/>
                </label>
                
                <label>
                    <input type='text' name="email" ref={ref_email} placeholder="Email" />
                </label>
                <label>
                    <input type='password' name="password" ref={ref_password} placeholder="Password" />
                </label>
                <label className="label">
                <input type="submit" value="Signup" className="input"/>
                </label>
            </form>
            <div>
                <span>Already have an account</span>
                <Link to={'/login'}>Login</Link>
            </div>
            
        </Container>
    );
}
