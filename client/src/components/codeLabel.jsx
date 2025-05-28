import React, { useContext, useRef } from "react";
import "./codeLabel.css";
import { AppContext } from "../context/AppUserContext.jsx";

export function CodeLabel() {
    const inputRefs = useRef([]);
    const {setCode} = useContext(AppContext);

    const handleChange = (e, idx) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value;
        if (value && idx < 3) {
            inputRefs.current[idx + 1].focus();
        }
        // Llama a onComplete si todos los inputs están llenos
        const code = inputRefs.current.map(input => input?.value).join("");
        setCode(code);
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !e.target.value && idx > 0) {
            inputRefs.current[idx - 1].focus();
        }
    };

    return (
        <div className="code-verification-container">
            {[...Array(4)].map((_, idx) => (
                <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    className="code-input"
                    ref={el => inputRefs.current[idx] = el}
                    onChange={e => handleChange(e, idx)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                    autoFocus={idx === 0}
                />
            ))}
        </div>
    );
}