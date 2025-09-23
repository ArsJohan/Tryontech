import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Title from "../components/title.jsx";
import Footer from "../components/footer.jsx";
import Banner from "../components/banner.jsx";
import "../assets/styles/pages/bodyTypeResult.css";
import "../assets/styles/pages/signUp.css";
import InvertedTriangleIcon from "../assets/images/bodyType/Icons/InvertedTriangle.png";
import OvalIcon from "../assets/images/bodyType/Icons/Oval.png";
import TriangleIcon from "../assets/images/bodyType/Icons/Triangle.png";
import RectangleIcon from "../assets/images/bodyType/Icons/Rectangle.png";
import HourglassIcon from "../assets/images/bodyType/Icons/Hourglass.png";
import TrapezoidIcon from "../assets/images/bodyType/Icons/Trapezoid.png";
import Button from "../components/button.jsx";
import { AppContext } from "../context/AppUserContext.jsx";


export default function BodyTypeResult({ data }) {
    const [openSection, setOpenSection] = useState(null); // Estado para controlar el acordeón
    const { imageUrl} = useContext(AppContext); // Obtener la URL de la imagen desde el contexto

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section)
    };
    const icons = {
        InvertedTriangle: InvertedTriangleIcon,
        Oval: OvalIcon,
        Triangle: TriangleIcon,
        Rectangle: RectangleIcon,
        Hourglass: HourglassIcon,
        Trapezoid: TrapezoidIcon,
    };
    
    const navigate = useNavigate();
    const handleTryOnClick = () => {
        navigate("/login"); // Cambia la ruta según sea necesario
    };

    return (
        <div className="body-type-result">
            <Card width={"107vw"} height={"130vh"}>
                <Header classN={"sg-header"}>
                    <>
                        <Banner spaceLeft={"127px"} spaceBottom={"0px"} spaceRight={"0px"} spaceTop={"0px"} />
                    </>
                </Header>
                <Title content={"Your fit is ready"} subtitle={"Try on your clothes now"} paddingLeft="120px"/>
                <div className="body-type-result-content">
                    <div className="body-type-result-image">
                        <div className="body-type-result-icon">
                            <img src={icons[data.title.replace(/ /g, "")]} alt="Body Type Result" />
                        </div>
                        <img src={imageUrl} alt="Body Type Result" className="img-bodyType"/>
                    </div>
                    <div className="body-type-result-text">
                        <p className="body-type-result-text-title">Your body type:</p>
                        <p className="body-type-result-text-subtitle">{data.title}</p>

                        {/* Acordeón dinámico */}
                        <div className="accordion">
                            {/* Characteristics */}
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${openSection === "characteristics" ? "open" : "closed"}`}
                                    onClick={() => toggleSection("characteristics")}
                                >
                                    Characteristics {openSection === "characteristics" ? "▲" : "▼"}
                                </button>
                                {openSection === "characteristics" && (
                                    <div className="accordion-content">
                                        <ul>
                                            {data.characteristics.map((char, index) => (
                                                <li key={index}>{char}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Recommendations */}
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${openSection === "recommendations" ? "open" : "closed"}`}
                                    onClick={() => toggleSection("recommendations")}
                                >
                                    Recommendations {openSection === "recommendations" ? "▲" : "▼"}
                                </button>
                                {openSection === "recommendations" && (
                                    <div className="accordion-content">
                                        <ul>
                                            {data.recommendations.map((rec, index) => (
                                                <li key={index}>{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="body-type-result-button">
                            <Button 
                                className={"bt-purple"} 
                                text={"Try on!"} 
                                onClick={handleTryOnClick}
                            />
                         </div>
                    </div>
                   
                </div>
               
                <Footer />
            </Card>
        </div>
    );
}