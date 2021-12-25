import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";

import ProtectedRoutes from "./components/ProtectedRoutes";
import UnProtectedRoutes from "./components/UnProtectedRoutes";
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";

const App = () => {
    return (
        <Router>
            <UserProvider>
                <SearchProvider>
                    <NavBar/>
                    <Routes>
                        <Route element={<UnProtectedRoutes/>}>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/" element={<Welcome/>}/>
                        </Route>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/playlist/:playlist_id" element={<Playlist/>}/>
                            <Route path="/playlists" element={<Playlists/>}/>
                            <Route path="/library" element={<Library/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </SearchProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
