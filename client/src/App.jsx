import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login.jsx';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* Agregar más rutas aqui*/}
            </Routes>
        </Router>
    );
}

export default App;
