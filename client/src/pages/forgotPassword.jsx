import "react-phone-input-2/lib/style.css";
import "../assets/styles/pages/signUp.css";
import "../assets/styles/pages/forgotPassword.css";
import "../assets/styles/pages/login.css";
import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Title from "../components/title";
import Banner from "../components/banner";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import arrowLeft from "../assets/images/arrow-left.svg";
import PhoneInput from "react-phone-input-2";
import  Card  from "../components/card.jsx";
import { Background } from "../components/background";
import logoBackground from "../assets/images/logo-background.png";
import { verificarEmail, verificarTelefono } from "../services/userApi.js";
import { enviarSms } from "../services/phoneServiceApi.js";
import { enviarEmail } from "../services/emailServiceApi.js";
import { AppContext } from "../context/AppUserContext.jsx";

export function ForgotPassword() {
    const navigate = useNavigate();
    const {setUserId} = useContext(AppContext);
    const [step, setStep] = useState("email"); 
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handlePhoneClick = () => {
        setStep("phone");
    };
    const handleEmailClick = () => {
        setStep("email");
    };

    const handleVerifyCodePhone = async (e,phoneNumber) => {
        e.preventDefault();
        setLoading(true);
        const verificar = await verificarTelefono({Telefono:phoneNumber});
        if (!verificar.exists) {
            setErrorMessage(verificar.message);   
            setLoading(false); // Desactiva el spinner si hay error
            return; // Detén la función aquí
        }
       
        const enviarSmsResponse = await enviarSms({Telefono:phoneNumber});
        if (enviarSmsResponse.success) {
            setUserId(enviarSmsResponse.userId); // Guarda el userId en el contexto
            navigate("/forgotPassword/code");
        } else {
            setErrorMessage(enviarSmsResponse.message);
            setLoading(false); // Desactiva el spinner si hay error
            return;
        }

    };
    const handleVerifyCodeEmail = async (e,email) => {
        e.preventDefault();
        setLoading(true);
        const verificar = await verificarEmail({Correo:email});
        if (!verificar.exists) {
            setErrorMessage(verificar.message);
            return;
        } 
        const enviarEmailResponse = await enviarEmail({Correo:email});
        
        if (enviarEmailResponse.success) { 
            setUserId(enviarEmailResponse.userId); // Guarda el userId en el contexto
            navigate("/forgotPassword/code"); 
        }else {
            setErrorMessage(enviarEmailResponse.message); 
        } 
        setLoading(verificar.exists || enviarEmailResponse.success);
       
    }

    if (loading) {
        return (
            <div className="sg-loading-container">
                <div className="sg-loading-spinner"></div>
            </div>
        );
    }
    return (
        <div className="sg-container"> 
            <Background elipseTop={"bk-circle-blur-topRight-md"} 
                        elipseBottom={"bk-circle-blur-bottomLeft-big"} width= {"800px"}
                        height={"1080px"}>
                            <h1 className="bk-title">“A new way <br/> to measure yourself ”</h1>
                            <img src={logoBackground} alt="Background" className="bk-image"/>
            </Background>
            <Card width={ "874px"} height={ "1080px"}>
                <Header classN={"sg-header"}>
                    <>
                       
                        <img src={arrowLeft} alt="arrow-left" className="sg-icon" onClick={() => navigate("/Login")}/>
                        <Banner spaceRight={"0px"} spaceLeft={"50px"} />
                    </>
                </Header>
                <div className="fg-form-container">
                    <Title content={"Reset your password"} 
                    subtitle={"Did you forget your password? Don’t worry, we got you ;) We will send you a code via email to reset your password. If you don’t have access to your email, select use phone number."}
                    paddingRight= "200px"/>
                    <div>
                        {step === "email" && (
                                <ForgotPasswordEmail onPhoneClick={handlePhoneClick} onVerifyCodeEmail={handleVerifyCodeEmail} />
                            )}
                            {step === "phone" && (
                                <ForgotPasswordPhone onEmailClick={handleEmailClick} onVerifyCodePhone={handleVerifyCodePhone}/>
                            )}
                    </div>

                    {errorMessage &&(       
                            <div className="lg-form-error-message animate-slide-up">
                                <p>{errorMessage}</p>
                            </div>
                    )}
                </div>
                <Footer/>
            </Card>
            
        </div>
    );
}


function ForgotPasswordEmail({onPhoneClick, onVerifyCodeEmail}) {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };
   return (
        <div>
            <div className="sg-form-input-group">
                <label htmlFor="Registeremail" className="sg-form-lb">Email</label>
                <input
                    type="email"
                    id="Registeremail"
                    className={`sg-form-input ${isEmailValid ? "" : "invalid"}`} // Agrega una clase si no es válido
                    style={{ width: "542px" }}
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                />
                {!isEmailValid && email.trim() !== "" && (
                    <span className="error-message">Please enter a valid email address</span>
                )}
            </div> 
            <div className="fg-container-buttons">
                <Button className={"bt-purple"} text={"Send Code"} onClick={(e) => onVerifyCodeEmail(e, email)}/>
                <Button className={"bt-transparent"} text={"Use Phone Number"} onClick={onPhoneClick}/>
            </div>
        </div>
   )



}



function ForgotPasswordPhone({onEmailClick, onVerifyCodePhone}) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const handlePhoneChange = (value) => {
        setPhoneNumber("+"+value); 

        const phoneRegex = /^\d{10,13}$/;
        setIsPhoneValid(phoneRegex.test(value));
        
    };
    return (
        <div>
            <div className="sg-form-input-group">
                <label className="sg-form-lb">Phone number</label>
                <PhoneInput
                    country={'us'}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    inputClass={`sg-form-phone-input ${isPhoneValid ? "" : "invalid"}`} // Agrega una clase si no es válido
                    containerClass="sg-phone-input-container"
                    buttonClass="sg-phone-button"
                    placeholder="(XXX) XXX-XXXX"
                />
                {!isPhoneValid && phoneNumber.trim() !== "" && (
                    <span className="error-message">Please enter a valid phone number</span>
                )}
            </div>
            <div className="fg-container-buttons">
                <Button className={"bt-purple"} text={"Send Code"} onClick={(e) => onVerifyCodePhone(e, phoneNumber)}/>
                <Button className={"bt-transparent"} text={"Use Email"} onClick={onEmailClick}/>

            </div>
        </div>

    )

}

