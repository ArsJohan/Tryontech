import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";
import Button from "../components/button";
import Title from "../components/title";
import Banner from "../components/banner";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import arrowLeft from "../assets/images/arrow-left.svg";
import { Background } from "../components/background";
import logoBackground from "../assets/images/logo-background.png";
import "../assets/styles/pages/signUp.css";


export function CreateNewPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const [error, setError] = useState("");

    const validatePassword = (pwd) => {
        setRequirements({
            length: pwd.length >= 8,
            uppercase: /[A-Z]/.test(pwd) && /[a-z]/.test(pwd),
            number: /\d/.test(pwd),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!requirements.length || !requirements.uppercase || !requirements.number || !requirements.specialChar) {
            setError("Password does not meet requirements");
            return;
        }
        useNavigate("/Login");
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
                    <Title content={"Create a new password"} 
                    subtitle={"Now you can create your new password and continue enjoying our services :)"}
                    paddingRight= "200px"/>
                    <div className="sg-form-input-group">
                            <label htmlFor="Registerpassword" className="sg-form-lb">New Password</label>
                            <input
                                type="password"
                                id="Newpassword"
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
                    <div className="sg-form-input-group">
                            <label htmlFor="ConfirmNewPassword" className="sg-form-lb">Confirm New Password</label>
                            <input
                                type="password"
                                id="ConfirmNewPassword"
                                className="sg-form-input"
                                style={{ width: "542px" }}
                                placeholder="*****"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {error && <div className="error-message">{error}</div>} 
                           
                           <div className="fg-container-buttons">
                                <Button className="bt-purple" text={"Confirm"} margin={"40px 0px 0px 0px"} onClick={handleSubmit}/>
                            </div>
                                    
                     </div>
                      
                </div>
                <Footer/>
            </Card>
        </div>
    );
}

export default CreateNewPassword;