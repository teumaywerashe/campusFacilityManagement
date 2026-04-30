import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserHome from "./components//UserHome";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { useContext } from "react";
import { StoreContext } from "./context/store";
import AdminHome from "./components/AdminHome";
import ResetPassword from "./components/ResetPassword";

function App() {
  
  const { role, token } = useContext(StoreContext);

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {!token && <Route path="/" element={<Home />}></Route>}
        {role && role === "admin" ? (
          <>
            <Route path="/*" element={<AdminHome />}></Route>
            <Route path="/admin/*" element={<AdminHome />}></Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<UserHome />}></Route>
            <Route path="/user/*" element={<UserHome />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
