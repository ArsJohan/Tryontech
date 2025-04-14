import React, {useState} from "react";
import Card from "../components/card";
import { Header } from "../components/header";
import arrowLeft from "../assets/images/arrow-left.svg";
import Footer from "../components/footer";
import Title from "../components/title";
import "../assets/styles/elements.css";
import "../assets/styles/pages/signUp.css";
import Barstep from "../components/Barstep";
import Button from "../components/button.jsx";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export function SignUpPersonal() {
    const [birthdateType, setBirthdateType] = useState("text");
    const [birthdateValue, setBirthdateValue] = useState("");
    return (
        <div className="sg-container">
            <Card width={"1100px"} height={"1040px"}>
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
                            <input type="text" id="Username" className="sg-form-input" style={{width:"366px"}} placeholder="John Doe"/>
                        </div>
                        <div className="sg-form-input-group">
                            <label htmlFor="Birthdate" className="sg-form-lb">What's your date of borth?</label>
                            <input
                                type={birthdateType}
                                id="Birthdate"
                                className="sg-form-input"
                                placeholder="DD/MM/YYYY"
                                value={birthdateValue}
                                onChange={(e) => setBirthdateValue(e.target.value)}
                                onFocus={() => setBirthdateType("date")}
                                onBlur={() => {
                                if (!birthdateValue) setBirthdateType("text");
                                }}
                                style={{width:"316px"}}
                            />
                        </div>
                        <div className="sg-form-input-group">
                          
                            <label htmlFor="Registeremail" className="sg-form-lb">Email</label>
                            <input type="email" id="Registeremail" className="sg-form-input"  style={{width:"542px"}} placeholder="Example@gmail.com"/>
                        </div>
                        <div className="sg-form-input-group">
                            <label htmlFor="Registerpassword" className="sg-form-lb">Password</label>
                            <input type="password" id="Registerpassword" className="sg-form-input"  style={{width:"542px"}} placeholder="*****"/>
                        </div>
                        <div className="sg-form-input-group" style={{ paddingRight: "400px" }}>
                            <label htmlFor="Phone" className="sg-form-lb">Phone number</label>
                            <PhoneInput
                                country={'us'} // País predeterminado (puedes cambiarlo)
                                value={''} // Valor inicial del input
                                onChange={(phone) => console.log(phone)} // Maneja el cambio del valor
                                inputClass="sg-form-phone-input" // Clase personalizada para el input
                                containerClass="sg-phone-input-container" // Clase personalizada para el contenedor
                                buttonClass="sg-phone-button" // Clase personalizada para el botón del país
                                placeholder="(XXX) XXX-XXXX" // Placeholder personalizado
                            />
                        </div>
                        <div className="sg-form-input-group">
                            <label className="sg-form-lb">What's your sex?</label>
                            <div className="sg-form-checkbox-group">
                                <input type="checkbox" id="Male" className="sg-form-checkbox" name="Sex" value="Male" />
                                <label  className="sg-form-lb" style={{paddingLeft:"8px"}}>Female</label>
                                <input type="checkbox" id="Female" className="sg-form-checkbox" name="Sex" value="Female" />
                                <label  className="sg-form-lb" style={{paddingLeft:"8px"}}>Male</label>
                                
                                
                            </div>
                        </div>
                        
                    </div>   
                    <Barstep step={1}>
                        <Button className={"bt-disabled"} text={"Next"} to={"/register-mesures"} width={"255px"}></Button>
                    </Barstep>
                     
                </div> 
               
                <Footer/>  
            </Card>
        </div>
    )
}

export default SignUpPersonal;