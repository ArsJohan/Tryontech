import React, {useState} from "react";
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
import "react-phone-input-2/lib/style.css";
import "../assets/styles/pages/signUp.css";
import "../assets/styles/pages/forgotPassword.css";


function ForgotPasswordEmail({onPhoneClick}) {
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
                <Button className={"bt-purple"} text={"Send Code"}/>
                <Button className={"bt-transparent"} text={"Use Phone Number"} onClick={onPhoneClick}/>
            </div>
        </div>
   )



}



function ForgotPasswordPhone({onEmailClick}) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const handlePhoneChange = (value) => {
        setPhoneNumber(value); 

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
                <Button className={"bt-purple"} text={"Send Code"}/>
                <Button className={"bt-transparent"} text={"Use Email"} onClick={onEmailClick}/>

            </div>
        </div>

    )

}




export function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState("email"); 
    const handlePhoneClick = () => {
        setStep("phone");
    };
    const handleEmailClick = () => {
        setStep("email");
    };

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
                                <ForgotPasswordEmail onPhoneClick={handlePhoneClick} />
                            )}
                            {step === "phone" && (
                                <ForgotPasswordPhone onEmailClick={handleEmailClick}/>
                            )}
                    </div>
                </div>
                <Footer/>
            </Card>
            
        </div>
    );
}

