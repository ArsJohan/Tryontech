import React, { useRef } from "react";
import "./codeLabel.css";

export function CodeLabel({ onComplete }) {
    const inputRefs = useRef([]);

    const handleChange = (e, idx) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value;
        if (value && idx < 5) {
            inputRefs.current[idx + 1].focus();
        }
        // Llama a onComplete si todos los inputs están llenos
        const code = inputRefs.current.map(input => input?.value).join("");
        if (onComplete && code.length === 4 && !code.includes("")) {
            onComplete(code);
        }
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