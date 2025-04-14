import React from "react";
import Card from "../components/card";
import { Header } from "../components/header";
import arrowLeft from "../assets/images/arrow-left.svg";
import Footer from "../components/footer";
import Title from "../components/title";
import "../assets/styles/elements.css";
import "../assets/styles/pages/signUp.css";

export function SignUpPersonal() {
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
                            <input type="text" id="Username" className="sg-form-input" placeholder="John Doe"/>
                        </div>
                        <div className="sg-form-input-group">
                            <label htmlFor="Birthdate" className="sg-form-lb">Birthdate</label>
                            <input type="date" id="Birthdate" className="sg-form-input" placeholder="DD/MM/YYYY"/>
                        </div>
                        <div className="sg-form-input-group">
                          
                            <label htmlFor="Registeremail" className="sg-form-lb">Email</label>
                            <input type="email" id="Registeremail" className="sg-form-input"  style={{width:"542px"}} placeholder="Example@gmail.com"/>
                        </div>
                        <div className="sg-form-input-group">
                            <label htmlFor="Registerpassword" className="sg-form-lb">Password</label>
                            <input type="password" id="Registerpassword" className="sg-form-input"  style={{width:"542px"}} placeholder="*****"/>
                        </div>
                        <div className="sg-form-input-group" style={{paddingRight:"400px"}}>
                            <label htmlFor="Phone" className="sg-form-lb">Phone number</label>
                            <input type="tel" id="Phone" className="sg-form-input"  style={{width:"542px"}} placeholder="(XXX) XXX-XXXX"/>
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
                </div>  
                <Footer/>  
            </Card>
        </div>
    )
}

export default SignUpPersonal;