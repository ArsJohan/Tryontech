import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login.jsx';


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            {/* Aquí irían las rutas protegidas, por ejemplo: RegistroDatos
            RegistroMedidas, y RegistroTipoCuerpo */}

          </ProtectedRoute>
        } />
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;