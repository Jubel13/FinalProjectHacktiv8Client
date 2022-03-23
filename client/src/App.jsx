import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CarList from "./pages/CarList";
import Navbar from "./components/navbar/templates/Navbar";
import Footer from "./components/footer/templates/Footer";
import Login from "./pages/Login";
import CmsDealer from "./pages/CmsDealer";
import Register from "./pages/Register";
import LoginDealer from "./pages/LoginDealer";
import RegisterDealer from "./pages/RegisterDealer";
import CmsAdmin from "./pages/CmsDealer";
import Detail from "./pages/DetailPage";
import MapsNavigation from "./components/MapsNavigation";
import FullReportPage from "./components/FullReportPage";
import PaymentPage from "./components/PaymentPage";
import RegisterModal from "./components/modals/templates/RegisterModal";
import NavigationGuard from "./components/navigationGuard/NavigationGuard";
import CmsDealerSellForm from "./pages/CmsDealerSellForm";
import CmsDealerDashboard from "./pages/CmsDealerDashboard";
import LoginModalDealer from "./components/modals/templates/LoginModalDealer";
import LoginModalBuyer from "./components/modals/templates/LoginModalBuyer";

export default function App() {
  const [loginDealer, setLoginDealer] = useState(false);
  const [loginBuyer, setLoginBuyer] = useState(false);
  return (
    <div className="App">
      <div className="w-full min-h-screen bg-white">
        <Navbar setLoginBuyer={setLoginBuyer} setLoginDealer={setLoginDealer} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/login/user" element={<Login />} />
          <Route
            path="/dealer/dashboard"
            element={
              <NavigationGuard>
                <CmsDealer />
              </NavigationGuard>
            }
          >
            <Route path="" element={<CmsDealerDashboard />} />
            <Route path="sell" element={<CmsDealerSellForm />} />
          </Route>
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="/full-report/:idInspection"
            element={<FullReportPage />}
          />
          <Route path="/map-navigation/:id" element={<MapsNavigation />} />
          <Route path="/payments/:carId" element={<PaymentPage />} />
          {/* <Route path="/login/dealer" element={<LoginDealer />} />
          <Route path="/register/user" element={<Register />} />
          <Route path="/register/dealer" element={<RegisterDealer />} /> */}
        </Routes>
        <Footer />
        <LoginModalDealer
          showModal={loginDealer}
          setShowModal={setLoginDealer}
        />
        <LoginModalBuyer 
          showModal={loginBuyer} 
          setShowModal={setLoginBuyer} 
        />
      </div>
    </div>
  );
}
