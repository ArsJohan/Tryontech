import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Barstep from "../components/Barstep.jsx";
import Button from "../components/button.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Background from "../components/background.jsx";
import Title from "../components/title.jsx";
import { crearCuenta } from "../services/userApi.js";
import { obtenerIdCliente } from "../services/userApi.js";
import Popup from "../components/popup.jsx";
import { AppContext } from "../context/AppUserContext.jsx";
import arrowLeft from "../assets/images/arrow-left.svg";


export function SignUpPersonal() {
    const { selectedSex, setSelectedSex } = useContext(AppContext);
    const { idCliente, setIdCliente } = useContext(AppContext); // Obtener el ID del cliente desde el contexto
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [birthdateType, setBirthdateType] = useState("text");
    const [birthdateValue, setBirthdateValue] = useState("");
    const [password, setPassword] = useState("");
    console.log("setSelectedSex:", setSelectedSex);
    const [loading, setLoading] = useState(false); // Estado para el spinner
    console.log("selectedId:", setIdCliente);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    const checkFormCompletion = () => {
        if (
            username.trim() !== "" &&
            email.trim() !== "" &&
            isEmailValid &&
            phoneNumber.trim() !== "" &&
            isPhoneValid &&
            birthdateValue.trim() !== "" &&
            password.trim() !== "" &&
            requirements.length &&
            requirements.uppercase &&
            requirements.number &&
            requirements.specialChar &&
            selectedSex !== ""
        ) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    };

    useEffect(() => {
        checkFormCompletion();
    }, [username, email, isEmailValid, phoneNumber, isPhoneValid, birthdateValue, password, requirements, selectedSex]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    const handlePhoneChange = (value) => {
        setPhoneNumber(value); 

        const phoneRegex = /^\d{10,13}$/;
        setIsPhoneValid(phoneRegex.test(value));
    };

    const handleSexChange = (e) => { 
        console.log("Selected sex:", e.target.value);

        setSelectedSex(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        setRequirements({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };

    const handleBirthdateChange = (e) => {
        setBirthdateValue(e.target.value);
    };

        // Calcula la fecha máxima permitida para que el usuario tenga al menos 18 años
    const getMaxDateFor18YearsOld = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18); // Resta 18 años de la fecha actual
        return today.toISOString().split("T")[0]; // Convierte la fecha a formato YYYY-MM-DD
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleBack = () => {
        navigate("/login"); // Navegar a la página de inicio de sesión
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activa el spinner

        const formData = {
            "Username": username,
            "Password": password,
            "Telefono": phoneNumber.substring(2),
            "Correo": email,
            "FechaNacimiento": birthdateValue,
            "Sexo": selectedSex
        };

        try {
            const response = await crearCuenta(formData);
            if (response === "Client saved successfully") {
                const idResponse = await obtenerIdCliente(email);
                if (idResponse !== 0) {
                    setIdCliente(idResponse);
                    console.log("ID del cliente:", idResponse);
                    navigate("/Measures");
                } else {
                    console.error("No se encontró un ID de cliente válido.");
                }
            } else {
                setPopupMessage(response);
                setIsPopupVisible(true);
            }
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            setPopupMessage("An error occurred. Please try again.");
            setIsPopupVisible(true);
        } finally {
            setLoading(false); // Desactiva el spinner al finalizar
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }
    return (
        <div className="sg-container">
            <Background elipseTop={"bk-circle-blur-topRight-sq"}
            elipseBottom={"bk-circle-blur-bottomLeft-medium"} width={"400px"} height={"1130px"}>
            </Background>
            <Card width={"1100px"} height={"1130px"}>
                <Header classN={"sg-header"}>
                    <>
                        <img src={arrowLeft} alt="arrow-left" className="sg-icon" onClick={handleBack}/>
                        <Title spaceLeft={"127px"} spaceBottom={"0px"} spaceRight={"0px"} spaceTop={"0px"}/>
                    </>  
                </Header>
                <Title content={"Create your account"} subtitle={"Customize your experience and find the perfect fit"}/>
                <div className="sg-form-container">
                            <Popup
                        isVisible={isPopupVisible} // Cambia esto según la lógica de tu aplicación
                        message={popupMessage} // Mensaje que deseas mostrar
                        onClose={handleClosePopup} // Función para cerrar el popup
                    /> 
                    <div className="sg-form-input-container">
                        <div className="sg-form-input-group">
                            <label htmlFor="Username" className="sg-form-lb">Username</label>
                            <input
                                type="text"
                                id="Username"
                                className="sg-form-input"
                                style={{ width: "366px" }}
                                placeholder="John Doe"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="sg-form-input-group">
                            <label htmlFor="Birthdate" className="sg-form-lb">What's your date of borth?</label>
                            <input
                                type={birthdateType}
                                id="Birthdate"
                                className="sg-form-input"
                                placeholder="DD/MM/YYYY"
                                value={birthdateValue}
                                onChange={handleBirthdateChange}
                                onFocus={() => setBirthdateType("date")}
                                onBlur={() => {
                                    if (!birthdateValue) setBirthdateType("text");
                                }}
                                max={getMaxDateFor18YearsOld()} // Establece la fecha máxima permitida
                                style={{ width: "316px" }}
                            />
                        </div>
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
                        <div className="sg-form-input-group">
                            <label htmlFor="Registerpassword" className="sg-form-lb">Password</label>
                            <input
                                type="password"
                                id="Registerpassword"
                                className="sg-form-input"
                                style={{ width: "542px" }}
                                placeholder="*****"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <ul className="password-requirements">
                                <li className={requirements.length ? "fulfilled" : ""}>Use 8 or more characters</li>
                                <li className={requirements.uppercase ? "fulfilled" : ""}>Use upper and lower case letters (e.g. Aa)</li>
                                <li className={requirements.number ? "fulfilled" : ""}>Use a number (e.g. 1234)</li>
                                <li className={requirements.specialChar ? "fulfilled" : ""}>Use a symbol (e.g. !@#$)</li>
                            </ul>
                        </div>
                        <div className="sg-form-input-group" style={{ paddingRight: "400px", paddingTop: "1px"}}>
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
                        <div className="sg-form-input-group">
                            <label className="sg-form-lb">What's your sex?</label>
                            <div className="sg-form-checkbox-group">
                                <input
                                    type="radio"
                                    id="Male"
                                    className="sg-form-checkbox"
                                    name="Sex"
                                    value="Male"
                                    style={{borderRadius:"10px"}}
                                    onChange={handleSexChange}
                                />
                                <label className="sg-form-lb" style={{ paddingLeft: "8px" }}>Male</label>
                                <input
                                    type="radio"
                                    id="Female"
                                    className="sg-form-checkbox"
                                    name="Sex"
                                    value="Female"
                                    style={{borderRadius:"10px"}}
                                    onChange={handleSexChange}
                                />
                                <label className="sg-form-lb" style={{ paddingLeft: "8px" }}>Female</label>
                            </div>
                        </div>
                        
                    </div>   
                    <Barstep step={1} positionRight={"16px"}>
                        <Button
                            className={isFormComplete ? "bt-purple" : "bt-disabled"}
                            text={"Next"}
                            width={"255px"}
                            onClick={handleSubmit}
                            disabled={!isFormComplete} // Deshabilitar el botón si el formulario no está completo
                        />
                    </Barstep>
                     
                </div> 
               
                <Footer/>  
            </Card>
        </div>
    )
}

export default SignUpPersonal;