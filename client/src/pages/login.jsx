import React, {useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Card  from '../components/card.jsx';
import {Button} from '../components/button.jsx';
import { Footer } from '../components/footer.jsx';
import '../assets/styles/pages/login.css';
import logout from '../assets/images/logout-icon.svg';
import {Background} from '../components/background.jsx';
import logoBackground from '../assets/images/logo-background.png';
import '../assets/styles/elements.css';
import { Link } from 'react-router-dom';
import { Banner } from '../components/banner.jsx';
import hide from '../assets/images/hide.png';
import visible from '../assets/images/visible.png';
import iniciarSesion  from '../services/loginApi.js';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        const loginData = {
            Correo: email,
            Password: password,
        };

        try {
            const response = await iniciarSesion(loginData);
            console.log("Inicio de sesión exitoso:", response);
            setSuccessMessage("Inicio de sesión exitoso: "+response.message);
            setErrorMessage("");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setSuccessMessage("");
            setErrorMessage("Error al iniciar sesión: Correo o contraseña incorrectos");
        }
    }
    const handleSignUp = () => {
        navigate("/PersonalInfo")
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
                    <Banner spaceRight={"90px"} spaceLeft={"0px"} />
                </header>
                
                <div className="lg-form-container">
                    <h1 className="lg-form-title">Sign in</h1>
                    <label htmlFor="Email" className="lg-form-lb-user">Email</label>
                    <input type="email" id="Email" className="lg-form-username" placeholder="Example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                        
                        <div className="lg-form-password-container" onClick={togglePasswordVisibility}>
                            <label htmlFor="Password" className="lg-form-lb-password">Password</label>
                            <div className="lg-form-password-toggle">
                                <img src={showPassword ? visible : hide} alt="Toggle Password Visibility" className="lg-form-password-icon" />
                                <span className="lg-form-hide-text">Hide</span>
                            
                            </div>
                    </div>
                    <input type={showPassword ? "text" : "password"} id="Password" className="lg-form-password" placeholder="*****" onChange={(e) => setPassword(e.target.value)}/>
                    <Link to="forgot" className="lg-form-forgot">Forgot your password?</Link>
                    <div className="lg-form-btn-container">
                       
                        <Button className={"bt-purple"} text={"Sign in" }  position={"relative"} zindex={"2"} right={"-40px"} onClick={handleSignIn}></Button>
                        <Button className={"bt-transparent"} text={"Sign up" }  position={"absolute"} zindex={"1"} onClick={handleSignUp}></Button>
                      
                    </div>
                        {errorMessage ? (
                            <div className="lg-form-error-message animate-slide-up">
                                <p>{errorMessage}</p>
                            </div>
                            ) : successMessage && (
                            <div className="lg-form-success-message animate-slide-down">
                                <p>{successMessage}</p>
                            </div>
                        )}
                    </div>
                <Footer/>
            </Card>
        </div>
       
        
    )
}

export default Login;