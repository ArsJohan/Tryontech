import React from "react";
import '../assets/styles/pages/signUp.css';
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Background from "../components/background.jsx";
import Button from "../components/button.jsx";
import Barstep from  "../components/Barstep.jsx";
import arrowLeft from "../assets/images/arrow-left.svg";
import Title from "../components/title.jsx";


export function SignUpMeasures() {
    return (
        <div className="sg-container">
            <Card width={"1100px"} height={"1120px"}>
                <Header classN={"sg-header"}>
                    <>
                        <img src={arrowLeft} alt="arrow-left" className="sg-icon"/>
                        <Title spaceLeft={"127px"} spaceBottom={"0px"} spaceRight={"0px"} spaceTop={"0px"}/>
                    </>  
                </Header>
                <div className="sg-form-title-container">
                     <h1 className="sg-form-title">Create an Account</h1>
                     <h2 className="sg-form-subtitle">Customize your experience and find the perfect fit</h2>
                </div>

                <Barstep step={2}/>
                <Footer/>
            </Card>
            
        </div>

    )

}

export default SignUpMeasures;