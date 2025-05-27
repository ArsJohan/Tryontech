import React, {useState} from "react";
import  {CodeLabel}  from "../components/codeLabel";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Title from "../components/title";
import Banner from "../components/banner";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import arrowLeft from "../assets/images/arrow-left.svg";
import  Card  from "../components/card.jsx";
import { Background } from "../components/background";
import logoBackground from "../assets/images/logo-background.png";
import "../assets/styles/pages/signUp.css";
import "../assets/styles/pages/forgotPassword.css";



export function CodeVerification() {

    const navigate = useNavigate();

    const handleCodeComplete = (code) => {
        // Aquí puedes validar el código o navegar
        console.log("Código ingresado:", code);
        // navigate("/new-password");
    };

    return ( <div className="sg-container"> 
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
                    <Title content={"Enter the code"} 
                    subtitle={"We sent you a four digit code, please enter the code to verify is you. If you didn’t receive a code, click in get a new code."}
                    paddingRight= "200px"/>
                    <div className="sg-form-input-group" style={{paddingLeft: "50px"}}>
                        <CodeLabel onComplete={handleCodeComplete} />;
                        <div className="fg-container-buttons">
                            <Button className={"bt-purple"} text={"Verify Code"}/>
                            <Button className={"bt-transparent"} text={"Resend Code"}/>
                        </div>
                       
                    </div>
                     
                </div>
                <Footer/>
            </Card>
            
        </div> 
);
};