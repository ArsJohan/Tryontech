import React, {useState, useEffect} from "react";
import Card from "../components/card.jsx";
import { Header } from "../components/header.jsx";
import arrowLeft from "../assets/images/arrow-left.svg";
import Footer from "../components/footer.jsx";
import Title from "../components/title.jsx";
import "../assets/styles/elements.css";
import "../assets/styles/pages/signUp.css";
import Barstep from "../components/Barstep.jsx";
import Button from "../components/button.jsx";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Background from "../components/background.jsx";

export function SignUpPersonal() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [birthdateType, setBirthdateType] = useState("text");
    const [birthdateValue, setBirthdateValue] = useState("");
    const [password, setPassword] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const [isFormComplete, setIsFormComplete] = useState(false);

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

        const phoneRegex = /^\d{10,}$/;
        setIsPhoneValid(phoneRegex.test(value));
    };

    const handleSexChange = (e) => {
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
    
    return (
        <div className="sg-container">
            <Background elipseTop={"bk-circle-blur-topRight-sq"}
            elipseBottom={"bk-circle-blur-bottomLeft-medium"} width={"400px"} height={"1130px"}>
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
                                style={{width:"316px"}}
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
                            to={isFormComplete ? "/Measures" : "#"}
                            width={"255px"}
                        />
                    </Barstep>
                     
                </div> 
               
                <Footer/>  
            </Card>
        </div>
    )
}

export default SignUpPersonal;