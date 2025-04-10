import React from 'react';
import Card  from '../components/card.jsx';
import {Button} from '../components/button.jsx';
import { Footer } from '../components/footer.jsx';
import '../assets/styles/pages/login.css';
import logout from '../assets/images/logout-icon.svg';
import {Background} from '../components/background.jsx';
import logoBackground from '../assets/images/logo-background.png';
import { Link } from 'react-router-dom';

export function Login() {
    return (
        
        <div className="lg-container">
            <Background elipseTop={"bk-circle-blur-topRight"} 
            elipseBottom={"bk-circle-blur-bottomLeft-big"}>
                <h1 className="bk-title">“A new way <br/> to measure yourself ”</h1>
                <img src={logoBackground} alt="Background" className="bk-image"/>
            </Background>

            <Card>
                <header className="lg-header">
                    <Link to="" className="logout">
                        <img src={logout} alt="Logout" className="icon"/>
                    </Link>
                </header>
                <div className="lg-title-container">
                    <div className="divider"></div>
                    <h1 className="lg-title">TryOnTech</h1>
                    <div className="divider"></div>
                </div>
                <div className="lg-form-container">
                    <h1 className="lg-form-title">Sign in</h1>
                    <label htmlFor="email" className="lg-form-lb-user">Email</label>
                    <input type="email" id="email" className="lg-form-username" placeholder="Example@gmail.com"/>
                    <label htmlFor="password" className="lg-form-lb-password">Password</label>
                    <input type="password" id="password" className="lg-form-password" placeholder="*****"/>
                    <Link to="forgot" className="lg-form-forgot">Forgot your password?</Link>
                    <div className="lg-form-btn-container">
                       
                        <Button className={"bt-purple"} text={"Sign in" } to="/"></Button>
                        <Button className={"bt-transparent"} text={"Sign up" } to="/Register"></Button>
                      
                    </div>
                </div>
                <Footer/>
            </Card>
        </div>
       
        
    )
}

export default Login;