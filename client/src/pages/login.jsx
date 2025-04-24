import React, {useState} from 'react';
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
import hide from '../assets/images/hide.png';
import visible from '../assets/images/visible.png';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
                        
                        <div className="lg-form-password-container" onClick={togglePasswordVisibility}>
                            <label htmlFor="Password" className="lg-form-lb-password">Password</label>
                            <div className="lg-form-password-toggle">
                                <img src={showPassword ? visible : hide} alt="Toggle Password Visibility" className="lg-form-password-icon" />
                                <span className="lg-form-hide-text">Hide</span>
                            
                            </div>
                    </div>
                    <input type={showPassword ? "text" : "password"} id="Password" className="lg-form-password" placeholder="*****"/>
                    <Link to="forgot" className="lg-form-forgot">Forgot your password?</Link>
                    <div className="lg-form-btn-container">
                       
                        <Button className={"bt-purple"} text={"Sign in" } to="/" position={"relative"} zindex={"2"} right={"-40px"}></Button>
                        <Button className={"bt-transparent"} text={"Sign up" } to="/PersonalInfo" position={"absolute"} zindex={"1"}></Button>
                      
                    </div>
                </div>
                <Footer/>
            </Card>
        </div>
       
        
    )
}

export default Login;