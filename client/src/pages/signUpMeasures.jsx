import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/pages/signUp.css';
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Background from "../components/background.jsx";
import Button from "../components/button.jsx";
import Barstep from  "../components/Barstep.jsx";
import rowUp from "../assets/images/row-up.svg";
import oneCircle from "../assets/images/one.svg";
import twoCircle from "../assets/images/two.svg";
import threeCircle from "../assets/images/three.svg";
import fourCircle from "../assets/images/four.svg";
import Title from "../components/title.jsx";
import '../assets/styles/elements.css';
import { AppContext } from "../context/AppUserContext.jsx";
import MenGuideLeg from "../assets/images/men-guide-leg.png";
import WomenGuideLeg from "../assets/images/women-guide-leg.png";
import MenGuideTrunk from "../assets/images/men-guide-trunk.png";
import WomenGuideTrunk from "../assets/images/women-guide-trunk.png";
import { crearTallaje } from "../services/tallajeCliApi.js";
import Popup from "../components/popup.jsx";
import Banner from "../components/banner.jsx";


export function SignUpMeasures() {
    const {IdCliente} = useContext(AppContext); // Obtiene el ID del cliente del contexto
    const { selectedSex } = useContext(AppContext); // Obtiene el sexo seleccionado del contexto
    const [measurements, setMeasurements] = useState({
        Hombros: "",
        Pecho: "",
        Cintura: "",
        Cadera: "",
        LargoPierna: "",
        Cuello: "",
        LargoBrazo: "",
        Peso: "",
        Altura: "",
        
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
    const [isClosing, setIsClosing] = useState(false);
    const [isLabelTrunk, setLabelTrunk] = useState(true); // Estado para mostrar las etiquetas de trunk o legs
    const [loading, setLoading] = useState(false); // Estado para el spinner
    const [popupMessage, setPopupMessage] = useState(""); // Estado para el mensaje del popup
    const [popupMesaageVisible, setPopupMessageVisible] = useState(false); // Estado para el popup
    const navigate = useNavigate();

    // Rango de medidas para hombres
    const maleMeasurementRanges = {
        Pecho: { min: 71, max: 152 },
        Cintura: { min: 60, max: 160 },
        Hombros: { min: 41, max: 61 },
        LargoBrazo: { min: 55, max: 85 },
        Cadera: { min: 71, max: 152 },
        Altura: { min: 150, max: 250 },
        Cuello: { min: 33, max: 51 },
        LargoPierna: { min: 66, max: 102 },
        Peso: { min: 50, max: 250 },
    };

    // Rango de medidas para mujeres
    const femaleMeasurementRanges = {
        Pecho: { min: 68, max: 188 },
        Cintura: { min: 50, max: 150 },
        Hombros: { min: 36, max: 56 },
        LargoBrazo: { min: 50, max: 75 },
        Cadera: { min: 56, max: 152 },
        Altura: { min: 140, max: 220 },
        Cuello: { min: 28, max: 46 },
        LargoPierna: { min: 61, max: 97 },
        Peso: { min: 30, max: 200 },
    };

    const measurementRanges = selectedSex === "Male" ? maleMeasurementRanges : femaleMeasurementRanges;

    const maleImages = {
        trunk: MenGuideTrunk,
        legs: MenGuideLeg ,
    };

    const femaleImages = {
        trunk: WomenGuideTrunk,
        legs: WomenGuideLeg,
    };

    const images = selectedSex === "Male" ? maleImages : femaleImages;

    const [currentImage, setCurrentImage] = useState(images.trunk);

    const handleMeasurementChange = (e) => {
        const { name, value } = e.target;

        // Filtrar caracteres no numéricos (permite números y un punto decimal)
        const numericValue = value.replace(/[^0-9.]/g, "");
    
        // Actualizar el estado de measurements con el valor filtrado
        setMeasurements((prev) => ({ ...prev, [name]: numericValue }));
    
        // Si no se encuentra un rango, no mostrar advertencias y permitir escribir
        if (!measurementRanges[name]) {
            console.warn(`No se encontró un rango para la medida: ${name}`);
            setWarnings((prev) => ({ ...prev, [name]: false }));
            return;
        }
    
        const { min, max } = measurementRanges[name];
    
        // Validar si el valor está fuera del rango
        if (numericValue && (parseFloat(numericValue) < min || parseFloat(numericValue) > max)) {
            setWarnings((prev) => ({ ...prev, [name]: true }));
        } else {
            setWarnings((prev) => ({ ...prev, [name]: false }));
        }
    };

    const checkFormCompletion = () => {
        const isComplete = Object.keys(measurements).every((key) => {
            const value = measurements[key];
            return typeof value === "string" && value.trim() !== "";
        });
    
        setIsFormComplete(isComplete);
    };

    useEffect(() => {
        checkFormCompletion();
    }, [measurements, warnings, isTermsAccepted]);

    const handleTrunkClick = () => {
        setCurrentImage(images.trunk); // Cambia la imagen a womenTrunk
        setLabelTrunk(true); // Cambia el estado para mostrar las etiquetas de trunk    
    };
    
    const handleLegsClick = () => {
        setCurrentImage(images.legs); // Cambia la imagen a womenLeg
        setLabelTrunk(false); // Cambia el estado para mostrar las etiquetas de legs
    };
    const handleClosePopup = () => {
        setIsClosing(true); // Activa la animación de cierre
        setTimeout(() => {
            setIsPopupVisible(false); // Oculta el popup después de la animación
            setIsClosing(false); // Resetea el estado de cierre
        }, 300); // La duración debe coincidir con la animación CSS
    };

    const handleClosePop = () => {
       setPopupMessageVisible(false); // Oculta el popup
    };

    const handleSubmit = async () => {
        setLoading(true); // Activa el spinner

        const isValid = Object.keys(measurements).every((key) => {
            const value = measurements[key];
            return value && !warnings[key];
        });
    
        if (!isValid) {
            console.error("Por favor, corrige los errores antes de continuar.");
            setLoading(false); // Desactiva el spinner si hay errores
            return;
        }
    
        try {
            const data = {
                ...measurements,
                IdCliente: IdCliente,
            };
            const response = await crearTallaje(data);
            if (response = "Customer measurements successfully added."){
                navigate("/login");
            }else{
             setPopupMessage(response);
             setPopupMessageVisible(true); // Muestra el popup con el mensaje de error
            }
        } catch (error) {
            setPopupMessageVisible(true); // Muestra el popup con el mensaje de error
            setPopupMessage("Error al crear el tallaje:", error);
        } finally {
            setLoading(false); // Desactiva el spinner al finalizar
        }
    };

    return (
        <div className="sg-container">
              <Background elipseTop={"bk-circle-blur-topRight-sq"}
                        elipseBottom={"bk-circle-blur-bottomLeft-medium"} width={"300px"} height={"1130px"}>
                </Background>
            <Card width={"1100px"} height={"1130px"}>
                <Header classN={"sg-header"}>
                    <>
                        <Banner spaceLeft={"127px"} spaceBottom={"0px"} spaceRight={"0px"} spaceTop={"0px"}/>
                    </>  
                </Header>
                <Title content={"Create your account"} subtitle={"Customize your experience and find the perfect fit"}/>
                <div className="sg-form-container">
                    <Popup
                        isVisible={popupMesaageVisible} // Cambia esto según la lógica de tu aplicación
                        message={popupMessage} // Mensaje que deseas mostrar
                        onClose={handleClosePop} // Función para cerrar el popup
                    /> 
                    <div className="sg-form-measures">
                        {Object.keys(measurements).map((key) => (
                                <div className="sg-form-input-group" key={key}>
                                    <label className="sg-form-lb">
                                        <span className="required-asterisk">*</span>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        className={`sg-form-input ${warnings[key] ? "invalid" : ""}`}
                                        placeholder={`Eg. ${key === "Altura" ? "1.67" : "70"}`}
                                        name={key}
                                        value={measurements[key]}
                                        onChange={handleMeasurementChange}
                                    />
                                    {warnings[key] && (
                                        <span className="error-message">
                                            Value must be between {measurementRanges[key].min} and {measurementRanges[key].max}.
                                        </span>
                                    )}
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

                        <Card width={"862px"} height={"662px"} z_index={1000} position={"fixed"} closing={isClosing ? "closing" : "" } transform={"translateY(0)"}>
                                <div className="sg-popup-header">
                                    <h1 className="sg-popup-title">How to Measure?</h1>
                                    <div className="sg-popup-close" onClick={handleClosePopup}>
                                        <img src={rowUp} className="sg-icon"></img>
                                    </div>
                                </div>
                                <div className="sg-popup-body">
                                    <div className="sg-popup-content-img">
                                            <img src={currentImage} alt="Measutement Guide" className="sg-img-guide"></img>
                                            <div className="sg-popup-content-guide" style={{ justifyContent: "space-evenly" }}>
                                                <div
                                                    className={`divider-h ${currentImage === images.trunk ? "active" : ""}`}
                                                    style={{ width: "98px", paddingLeft: "10px", paddingTop: "0px", cursor: "pointer" }}
                                                    onClick={handleTrunkClick}
                                                ></div>
                                                <div
                                                    className={`divider-h ${currentImage === images.legs ? "active" : ""}`}
                                                    style={{ width: "98px", paddingLeft: "10px", paddingTop: "0px", cursor: "pointer" }}
                                                    onClick={handleLegsClick}
                                                ></div>
                                            </div>
                                        <div className="sg-popup-content-guide" style={{ justifyContent: "space-evenly" }}>
                                            <p
                                                className={`sg-popup-option ${currentImage === images.trunk ? "active" : ""}`}
                                                onClick={handleTrunkClick}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Trunk
                                            </p>
                                            <p
                                                className={`sg-popup-option ${currentImage === images.legs ? "active" : ""}`}
                                                onClick={handleLegsClick}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Legs
                                            </p>
                                        </div>
                                        
                                            
                                    </div>
                                    {isLabelTrunk && (
                                        <div className="sg-popup-content">
                                            <div className="sg-popup-content-guide">
                                                <img src={oneCircle}></img>
                                                <h2 className="sg-popup-subtitle">ARM LENGTH</h2>
                                                <a className="sg-popup-text">
                                                Measure from the shoulder seam down to your wrist.
                                                </a>
                                            </div>
                                            <div className="sg-popup-content-guide">
                                                <img src={twoCircle}></img>
                                                <h2 className="sg-popup-subtitle">CHEST</h2>
                                                <a className="sg-popup-text">
                                                Wrap the tape around the fullest part of your chest, keeping it level.
                                                </a>
                                            </div>
                                            <div className="sg-popup-content-guide">
                                                <img src={threeCircle}></img>
                                                <h2 className="sg-popup-subtitle">WAIST</h2>
                                                <a className="sg-popup-text">
                                                Measure around the widest part of your hips, keeping the tape snug but not tight.
                                                </a>
                                            </div>
                                            <div className="sg-popup-content-guide">
                                                <img src={fourCircle}></img>
                                                <h2 className="sg-popup-subtitle">BOTTOM HIP</h2>
                                                <a className="sg-popup-text">
                                                    Measure around the lower part of your hips, just above the thighs.
                                                </a>
                                            </div>
                                         </div>
                                    )}
                            {!isLabelTrunk && (
                                <div className="sg-popup-content">
                                     <div className="sg-popup-content-guide">
                                         <img src={oneCircle}></img>
                                         <h2 className="sg-popup-subtitle">WAIST</h2>
                                         <a className="sg-popup-text">
                                         Measure around the widest part of your hips, keeping the tape snug but not tight.
                                         </a>
                                     </div>
                                        <div className="sg-popup-content-guide">
                                            <img src={twoCircle}></img>
                                            <h2 className="sg-popup-subtitle">BOTTOM HIP</h2>
                                            <a className="sg-popup-text">
                                                Measure around the lower part of your hips, just above the thighs.
                                            </a>
                                        </div>
                                        <div className="sg-popup-content-guide">
                                            <img src={threeCircle}></img>
                                            <h2 className="sg-popup-subtitle">LEG LENGTH</h2>
                                            <a className="sg-popup-text">
                                            Measure from the top of your inner thigh down to your ankle.                                            
                                            </a>
                                        </div>
                                </div>
                            )}
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
                            width={"255px"}
                            onClick={handleSubmit}
                        />
                    </div>
                </Barstep>
                <Footer/>
            </Card>
            
        </div>

    )

}

export default SignUpMeasures;