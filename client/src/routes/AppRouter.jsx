import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login.jsx';

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
        <Route path="/login" element={<Login />} />
        {/*<Route path="/" element={
          <ProtectedRoute>
            <FittingRoom />
          </ProtectedRoute>
        } />*/}
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;