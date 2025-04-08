import React from 'react';
import Card  from '../components/card.jsx';
import {Button} from '../components/button.jsx';
import { Footer } from '../components/footer.jsx';
import '../assets/styles/pages/login.css';
import logout from '../assets/images/logout-icon.svg';
import { BrowserRouter, UNSAFE_createBrowserHistory } from 'react-router-dom';
import {Background} from '../components/background.jsx';

export function Login() {
    return (
        
        <div className='lg-container'>
            <Background></Background>

            <Card>
                <header className="lg-header">
                    <a href="login" className="logout">
                        <img src={logout} alt="Logout" className="icon"/>
                    </a>
                </header>
                <div className="lg-title-container">
                    <div className="divider"></div>
                    <h1 className="lg-title">TryOnTech</h1>
                    <div className="divider"></div>
                </div>
                <div className="lg-form-container">
                    <h1 className="lg-form-title">Sign in</h1>
                    <label htmlFor="email" className="lg-form-lb">Email</label>
                    <input type="email" id="email" className="lg-form-username" placeholder="Example@gmail.com"/>
                    <label htmlFor="password" className="lg-form-lb">Password</label>
                    <input type="password" id="password" className="lg-form-password" placeholder="*****"/>
                    <a href="forgot" className="lg-form-forgot">Forgot your password?</a>
                    <div className="lg-form-btn-container">
                        <BrowserRouter>
                        <Button className={"bt-purple"} text={"Sign in" } to="/interfaz"></Button>
                        <Button className={"bt-transparent"} text={"Sign up" } to="/interfaz"></Button>
                        </BrowserRouter>
                    </div>
                </div>
                <Footer/>
            </Card>
        </div>
       
        
    )
}