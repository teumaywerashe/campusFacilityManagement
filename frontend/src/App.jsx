import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import UserHome from "./components//UserHome.jsx";
import Home from "./pages/Home.jsx";
import {  Toaster } from "sonner";
import { useContext } from "react";
import { StoreContext } from "./context/store.jsx";
import AdminHome from "./components/AdminHome.jsx";

function App() {
  const { role, token } = useContext(StoreContext);

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        {!token && <Route path="/" element={<Home />}></Route>}
        {role === "user" ? (
          <>
            <Route path="/*" element={<UserHome />}></Route>
            <Route path="/user/*" element={<UserHome />}></Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<AdminHome />}></Route>
            <Route path="/admin/*" element={<AdminHome />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
