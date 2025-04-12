import React from "react";
import Card from "../components/card";
import { Header } from "../components/header";
import {arrowLeft} from "../assets/images/arrow-left.svg";
import Footer from "../components/footer";

export function SignUpPersonal() {
    return (
        <div className="sg-container">
            <Card>
                <Header classN={"sg-header"}>
                    <image src={arrowLeft} alt="arrow-left" className="sg-icon"/>
                    <div className="divider"></div>
                    <h1 className="sg-title">TryOnTech</h1>
                    <div className="divider"></div>
                </Header>
                
                <div className="sg-form-container">
                    <div className="sg-form-title-container">
                        <h1 className="sg-form-title">Create an Account</h1>
                        <h2 className="sg-form-subtitle">Customize your experience and find the perfect fit</h2>
                    </div>
                    <div className="sg-form-input-container">
                        <label htmlFor="Username" className="sg-form-lb-name">Username</label>
                        <input type="text" id="Username" className="sg-form-Username" placeholder="John Doe"/>
                        <label htmlFor="Birthdate" className="sg-form-lb-birthdate">Birthdate</label>
                        <input type="date" id="Birthdate" className="sg-form-Birthdate" placeholder="DD/MM/YYYY"/>
                        <label htmlFor="Email" className="sg-form-lb-email">Email</label>
                        <input type="email" id="Email" className="sg-form-Email" placeholder="Example@gmail.com"/>
                        <label htmlFor="Password" className="sg-form-lb-password">Password</label>
                        <input type="password" id="Password" className="sg-form-Password" placeholder="*****"/>
                        <label htmlFor="Phone" className="sg-form-lb-phone">Phone number</label>
                        <input type="tel" id="Phone" className="sg-form-Phone" placeholder="(XXX) XXX-XXXX"/>
                        <label htmlFor="Sex" className="sg-form-lb-sex">What's your sex?</label>
                        <div className="sg-form-checkbox-group">
                            <label>
                                <input type="checkbox" id="Male" name="Sex" value="Male" />
                                Male
                            </label>
                            <label>
                                <input type="checkbox" id="Female" name="Sex" value="Female" />
                                Female
                            </label>
                            
                        </div>
                    </div>   
                </div>  
                <Footer/>  
            </Card>
        </div>
    )
}