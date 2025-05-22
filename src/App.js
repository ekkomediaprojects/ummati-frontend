import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import  GTMProvider  from './hooks/GTMProvider';
import React, { useState, useEffect } from "react";
import { AuthProvider } from "./authProviders/AuthContext";
import SpotifyTokenHandler from "./authProviders/SpotifyTokenHandler";
import ProtectedRoute from "./authProviders/ProtectedRoute";
import LoginRoute from "./authProviders/LoginContext";
import HomePage from './pages/HomePage';
import Podcast from './pages/Podcast';
import Chapters from './pages/Chapters';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Dallas from './pages/Chapters/Dallas';
import FortWorth from './pages/Chapters/FortWorth';
import LittleRock from './pages/Chapters/LittleRock';
import Houston from './pages/Chapters/Houston';
import Events from './pages/Events/EventsParent';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile/Profile';
import ScrollToTop from './pages/ScrollToTop';
import Error404Page from "./404/Error404Page";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CircularProgress from '@mui/material/CircularProgress';
import DashboardLayout from "./dashboard/dashboardlayout";
import AccountDetails from "./dashboard/accountdetails/accountspage";
import AccountSecurity from "./dashboard/accountsecuirty/secuirtypage";
import AdminSupport from "./dashboard/adminsupport/supportpage";
import DashboardLayout1 from "./dashboard/adminsupport/selecteduser/singleuserpage"
import Bookings from "./dashboard/bookings/bookingspage";
import MembershipManagement from "./dashboard/membershipmanagement/membershippage";
import UserList from "./dashboard/userlist/userslistpage";
import EventCategories from './dashboard/eventcategories/eventcategoriespage';
import EventLocations from "./dashboard/eventlocations/eventlocationspage";
import EventMangement from "./dashboard/eventmanagement/maineventpage";
import AddEvent from "./dashboard/eventmanagement/addevent/addeventpage";
import EditEvent from "./dashboard/eventmanagement/editevent/single/editeventpage";
import DashboardIndex from './dashboard/dashboardpage'
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}>
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  return (
    <AuthProvider>
      <GTMProvider>
        <SpotifyTokenHandler />
        <Router>
          <ScrollToTop />
          {!loading && <Header />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/paymenthistory" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/subscription" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chapters/dallas" element={<Dallas />} />
            <Route path="/chapters/little-rock" element={<LittleRock />} />
            <Route path="/chapters/houston" element={<Houston />} />
            <Route path="/chapters/fort-worth" element={<FortWorth />} />
            <Route path="/events" element={<Events />} />
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<DashboardIndex />} />
              <Route path="account-details" element={<AccountDetails />} />
              <Route path="account-security" element={<AccountSecurity />} />
              <Route path="admin-support" element={<AdminSupport />} />
              <Route path="admin-support/:userid" element={<DashboardLayout1 />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="membership-management" element={<MembershipManagement/>} />
              <Route path="user-list" element={<UserList/>} />
              <Route path="event-categories" element={<EventCategories/>} />
              <Route path="event-locations" element={<EventLocations/>} />
              <Route path="event-management" element={<EventMangement/>} />
              <Route path="event-management/add-event" element={<AddEvent/>} />
              <Route path="event-management/edit/:id" element={<EditEvent/>} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
          {!loading && <Footer />}
        </Router>
      </GTMProvider>
    </AuthProvider>
  );
}

export default App;