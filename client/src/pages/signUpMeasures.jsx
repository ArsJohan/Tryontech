import React, {useState, useEffect} from "react";
import '../assets/styles/pages/signUp.css';
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Background from "../components/background.jsx";
import Button from "../components/button.jsx";
import Barstep from  "../components/Barstep.jsx";
import arrowLeft from "../assets/images/arrow-left.svg";
import rowUp from "../assets/images/row-up.svg";
import Title from "../components/title.jsx";
import '../assets/styles/elements.css';


export function SignUpMeasures() {
    const [measurements, setMeasurements] = useState({
        chest: "",
        waist: "",
        shoulder: "",
        armsLength: "",
        bottomHip: "",
        height: "",
        collar: "",
        lowerLegLength: "",
        weight: "",
    });

    const [warnings, setWarnings] = useState({
        chest: false,
        waist: false,
        shoulder: false,
        armsLength: false,
        bottomHip: false,
        height: false,
        collar: false,
        lowerLegLength: false,
        weight: false,
    });

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleMeasurementChange = (e) => {
        const { name, value } = e.target;

        // Actualiza el estado de las medidas
        setMeasurements((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Verifica si el valor es sospechoso
        const isSuspicious = isNaN(value) || value <= 0 || value > 200; // Ejemplo de rango razonable
        setWarnings((prev) => ({
            ...prev,
            [name]: isSuspicious,
        }));
    };

    const checkFormCompletion = () => {
        const allFieldsFilled = Object.values(measurements).every((value) => value.trim() !== "");
        const noWarnings = Object.values(warnings).every((warning) => !warning);

        setIsFormComplete(allFieldsFilled && noWarnings && isTermsAccepted);
    };

    useEffect(() => {
        checkFormCompletion();
    }, [measurements, warnings, isTermsAccepted]);

    return (
        <div className="sg-container">
              <Background elipseTop={"bk-circle-blur-topRight-sq"}
                        elipseBottom={"bk-circle-blur-bottomLeft-medium"} width={"300px"} height={"1130px"}>
                </Background>
            <Card width={"1100px"} height={"1130px"}>
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

                <div className="sg-form-container">
                    <div className="sg-form-measures">
                        {Object.keys(measurements).map((key) => (
                                <div className="sg-form-input-group" key={key}>
                                    <label className="sg-form-lb">*{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    <input
                                        type="text"
                                        className={`sg-form-input ${warnings[key] ? "invalid" : ""}`}
                                        placeholder={`Eg. ${key === "height" ? "1.67" : "70"}`}
                                        name={key}
                                        value={measurements[key]}
                                        onChange={handleMeasurementChange}
                                    />
                                    {warnings[key] && <span className="error-message">Suspicious</span>}
                                    <label className="sg-form-lb-bottom">Measurements are in centimeters (cm).</label>
                                </div>
                            ))}
                           
                    </div>
                    <div className="sg-measurements-help">
                        <label>
                            Not sure how to take your <br/> measurements? <a
                             style={{textDecoration: "underline", color: "#6710E0", cursor: "pointer" }}
                             href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsPopupVisible(true); // Muestra el popup
                            }}
                             >
                            Here
                            </a>
                        </label>
                    </div>
                    {isPopupVisible && (

                        <Card width={"862px"} height={"662px"} z_index={1000} position={"fixed"}>
                                <div className="sg-popup-header">
                                    <h1 className="sg-popup-title">How to Measure?</h1>
                                    <div className="sg-popup-close" onClick={() => setIsPopupVisible(false)}>
                                        <img src={rowUp}></img>
                                    </div>
                                </div>
                                <div className="sg-popup-content">
                                </div>
                        
                        </Card>


                    )}
                    <div className="divider-v" style={{left:"731px"}}></div>
                    <div className="divider-v" style={{right:"351px"}}></div>


                </div>

                <Barstep step={2} positionLeft={"86px"}>
                    <div className="sg-form-btn-container">
                        <div className="sg-terms-container">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            className="sg-form-checkbox"
                            name="terms"
                            value="accepted"
                            style={{borderRadius: "0px"}}
                            onChange={(e) => setIsTermsAccepted(e.target.checked)} // Actualiza el estado del checkbox
                        />
                        <label htmlFor="termsCheckbox" className="sg-form-lb" style={{ paddingLeft: "8px" }}>
                            By creating an account, you agree to our{" "}
                            <a href="/terms" style={{ textDecoration: "underline", color: "#6710E0" }}>
                                Terms of Use
                            </a>{" "}
                            and
                            <br />
                            <a href="/privacy" style={{ textDecoration: "underline", color: "#6710E0" }}>
                                Privacy Policy
                            </a>.
                        </label>
                        </div>
                        <Button
                            className={isFormComplete ? "bt-purple" : "bt-disabled"}
                            text={"Sign Up"}
                            to={isFormComplete ? "/bodyType" : "#"}
                            width={"255px"}
                        />
                    </div>
                </Barstep>
                <Footer/>
            </Card>
            
        </div>

    )

}

export default SignUpMeasures;