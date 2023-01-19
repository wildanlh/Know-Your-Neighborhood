import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from './context/auth-context';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StorePage from './pages/StorePage';
import DetailStorePage from './pages/DetailStorePage';
import AddStorePage from './pages/AddStorePage';
import ProfilePage from './pages/ProfilePage';
import FacebookLogin from './pages/FacebookLogin';
import EditStorePage from './pages/EditStorePage';
import EditProfilePage from './pages/EditProfilePage';
import { useContext } from 'react';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {!isLoggedIn && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/oauth2/redirect" element={<FacebookLogin />} />

          <Route path="/stores/*" element={<Navigate to="/login" />} />
          <Route path="/profile/*" element={<Navigate to="/login" />} />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route path="/stores" element={<StorePage />} />
          <Route path="/stores/add" element={<AddStorePage />} />
          <Route
            path="/stores/:storeName/:storeId"
            element={<DetailStorePage />}
          />
          <Route
            path="/stores/:storeName/:storeId/edit"
            element={<EditStorePage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/:name/:userId" element={<ProfilePage />} />
        </>
      )}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
