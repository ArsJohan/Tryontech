import React from "react";
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Title from "../components/title.jsx";
import Footer from "../components/footer.jsx";
import Banner from "../components/banner.jsx";
import "../assets/styles/pages/bodyTypeResult.css";
import "../assets/styles/pages/SignUp.css";



export function BodyTypeResult() {
    return (
        <div className="body-type-result">
            <Card width={"100%"} height={"100%"}>
                <Header classN={"sg-header"}>
                    <>
                        <Banner spaceLeft={"127px"} spaceBottom={"0px"} spaceRight={"0px"} spaceTop={"0px"}/>
                    </>  
                </Header>
                <Title content={"Your fit is ready"} subtitle={"Try on your clothes now"}/>
                <div className="body-type-result-content">
                    
                    <div className="body-type-result-image">
                        <div class="body-type-result-icon">★</div>
                        <img src={"../assets/images/cancel.png"} alt="Body Type Result" />
                    </div>
                    <div className="body-type-result-text">
                        <p className="body-type-result-text-title">Your body type:</p>
                        <p className="body-type-result-text-subtitle">Triangulo</p>
                    </div>
                   
                </div>
                <Footer/>

            </Card>
        </div>
    );
}