import React from 'react';
import Card  from '../components/card.jsx';
import {Button} from '../components/button.jsx';
import { Footer } from '../components/footer.jsx';
import '../assets/styles/pages/login.css';
import logout from '../assets/images/logout-icon.svg';
import {Background} from '../components/background.jsx';
import logoBackground from '../assets/images/logo-background.png';
import '../assets/styles/elements.css';
import { Link } from 'react-router-dom';
import Title from '../components/title.jsx';

export function Login() {
    return (
        
        <div className="lg-container">
            <Background elipseTop={"bk-circle-blur-topRight-md"} 
            elipseBottom={"bk-circle-blur-bottomLeft-big"} width= {"800px"}
            height={"1080px"}>
                <h1 className="bk-title">“A new way <br/> to measure yourself ”</h1>
                <img src={logoBackground} alt="Background" className="bk-image"/>
            </Background>

            <Card width={ "874px"} height={ "1080px"}>
                <header className="lg-header">
                    
                    <Link to="" className="logout">
                        <img src={logout} alt="Logout" className="icon"/>
                    </Link>
                    <Title spaceRight={"90px"} spaceLeft={"0px"} />
                </header>
                
                <div className="lg-form-container">
                    <h1 className="lg-form-title">Sign in</h1>
                    <label htmlFor="Email" className="lg-form-lb-user">Email</label>
                    <input type="email" id="Email" className="lg-form-username" placeholder="Example@gmail.com"/>
                    <label htmlFor="Password" className="lg-form-lb-password">Password</label>
                    <input type="password" id="Password" className="lg-form-password" placeholder="*****"/>
                    <Link to="forgot" className="lg-form-forgot">Forgot your password?</Link>
                    <div className="lg-form-btn-container">
                       
                        <Button className={"bt-purple-lg"} text={"Sign in" } to="/"></Button>
                        <Button className={"bt-transparent"} text={"Sign up" } to="/PersonalInfo"></Button>
                      
                    </div>
                </div>
                <Footer/>
            </Card>
        </div>
       
        
    )
}

export default Login;