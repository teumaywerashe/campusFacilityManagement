import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import UserHome from "./components//UserHome.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "sonner";
import { useContext, useEffect } from "react";
import { StoreContext } from "./context/store.jsx";
import AdminHome from "./components/AdminHome.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App() {
  
  const { role, theme, token } = useContext(StoreContext);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

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
