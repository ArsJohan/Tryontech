import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/login.jsx';
import { SignUpPersonal } from '../pages/singUpPersonal.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, simplemente no muestra nada
  if (!isAuthenticated) {
    return null; // También puedes usar: return <Navigate to="/login" />
  }

  return children;
};


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
          {/* Ruta por defecto que redirige a /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpPersonal/>}/>
        {/*<Route path="/" element={
          <ProtectedRoute>
            <FittingRoom />
          </ProtectedRoute>
        } />*/}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;