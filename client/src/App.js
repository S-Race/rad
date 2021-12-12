import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";

import ProtectedRoutes from "./components/ProtectedRoutes";
import UnProtectedRoutes from "./components/UnProtectedRoutes";
import { UserProvider } from "./UserContext";

const App = () => {
    return (
        <Router>
            <UserProvider>
                <NavBar/>
                <Routes>
                    <Route element={<UnProtectedRoutes/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/" element={<Welcome/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </UserProvider>
        </Router>
    );
};

export default App;
