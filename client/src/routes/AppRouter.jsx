import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Login} from '../pages/login.jsx';
import { SignUpPersonal } from '../pages/signUpPersonal.jsx';
import {SignUpMeasures} from '../pages/signUpMeasures.jsx';
import { BodyTypeResultsPage } from '../pages/bodyTypeResultPage.jsx';
import { ForgotPassword } from '../pages/forgotPassword.jsx';
import { CodeVerification } from '../pages/codeVerification.jsx';
import { CreateNewPassword } from '../pages/createNewPassword.jsx';


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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PersonalInfo" element={<SignUpPersonal/>}/>
        <Route path="/Measures" element={<SignUpMeasures/>}/>
        <Route path="/bodyType/:bodyType" element={<BodyTypeResultsPage />} />
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path="/forgotPassword/code" element={<CodeVerification />} />
        <Route path='/newPassword' element={<CreateNewPassword/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;