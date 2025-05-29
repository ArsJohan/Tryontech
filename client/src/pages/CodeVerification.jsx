import React, {useContext, useState, useEffect} from "react";
import  {CodeLabel}  from "../components/codeLabel";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import Title from "../components/title";
import Banner from "../components/banner";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import arrowLeft from "../assets/images/arrow-left.svg";
import  Card  from "../components/card.jsx";
import { Background } from "../components/background";
import logoBackground from "../assets/images/logo-background.png";
import "../assets/styles/pages/signUp.css";
import "../assets/styles/pages/forgotPassword.css";
import { AppContext } from "../context/AppUserContext.jsx";
import { verificarCodigo } from "../services/loginApi.js";



export function CodeVerification() {

    const navigate = useNavigate();

    const {code} = useContext(AppContext);
    const [codeError, setCodeError] = useState(false);
    const {userId} = useContext(AppContext); // Obtiene el userId de los parámetros de la URL
    const {setToken} = useContext(AppContext); // Obtiene la función setToken del contexto
    const [errorMessage, setErrorMessage] = useState("");

      // Estado para el contador (5 minutos = 300 segundos)
    const [secondsLeft, setSecondsLeft] = useState(300);

    useEffect(() => {
        if (secondsLeft === 0) return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);
    
    const handleVerifyCode = async (e) => {
        e.preventDefault();

        const verificar = await verificarCodigo(
            {   userId: userId, // Usa el userId del contexto
                Code:code
            }
        );
        if (!verificar.success) {
            setCodeError(true); // Activa el error
            setTimeout(() => setCodeError(false), 800); // Quita el error después de la animación
            setErrorMessage(verificar.message);
            
            return;
        }
        setToken(verificar.token); // Guarda el token en el contexto
        navigate("/newPassword");
    };
    const handleResendCode = () => {
        // Aquí va la lógica para reenviar el código
        if (secondsLeft === 0) {
        // Aquí va la lógica para reenviar el código
            navigate("/forgotPassword")
        };
        
    };

     // Formatea el tiempo mm:ss
    const formatTime = (secs) => {
        const m = String(Math.floor(secs / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${m}:${s}`;
    };
    return ( <div className="sg-container"> 
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
                    <Title content={"Enter the code"} 
                    subtitle={"We sent you a four digit code, please enter the code to verify is you. If you didn’t receive a code, click in get a new code."}
                    paddingRight= "200px"/>
                    <div className="sg-form-input-group" style={{paddingLeft: "50px"}}>
                        <CodeLabel codeError={codeError}/>
                        {secondsLeft > 0 && (
                            <div style={{ marginTop: "10px", color: "#888", justifyContent: "center", display: "flex", alignItems: "center" }}>
                                You can resend the code in
                                <span style={{ color: "#6710E0", fontWeight: "bold", marginLeft: "6px" }}>
                                    {formatTime(secondsLeft)}
                                </span>
                            </div>
                        )}
                        <div className="fg-container-buttons">
                            <Button className={"bt-purple"} text={"Verify Code"} onClick={handleVerifyCode}/>
                            <Button
                            className={"bt-transparent"}
                            text={"Resend Code"}
                            onClick={handleResendCode}
                            disabled={secondsLeft > 0}
                            />
                            
                        </div>
                        {errorMessage &&(       
                            <div className="lg-form-error-message animate-slide-up">
                                <p>{errorMessage}</p>
                            </div>
                        )}
                       
                    </div>
                     
                </div>
                <Footer/>
            </Card>
            
        </div> 
);
};