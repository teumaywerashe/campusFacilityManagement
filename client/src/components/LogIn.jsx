import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/store";

// Make sure you have Tailwind configured in your project
// No external CSS file needed

function LogIn() {
  const { setToken, setId, setRole, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("Log in");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const toggleStatus = () => {
    setStatus(status === "Log in" ? "Sign up" : "Log in");
    setData({ name: "", email: "", password: "" });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = status === "Log in" ? "/user/login" : "/user/register";
      const newUrl = `${url}${endpoint}`;

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        toast.success(response.data.msg);
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("role", response.data.user.role);

        setToken(response.data.token);
        setRole(response.data.user.role);
        setId(response.data.user.id);

        navigate(`/${response.data.user.role}/`);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main Container (Full Screen Background)
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            {status}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status === "Log in" 
              ? "Welcome back! Please enter your details." 
              : "Create a new account to get started."}
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-6" onSubmit={onFormSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Name Input (Only for Sign Up) */}
            {status === "Sign up" && (
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={data.name}
                  onChange={updateData}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                  placeholder="Your Name"
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={updateData}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={data.password}
                onChange={updateData}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <span 
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => toast.info("Feature coming soon!")}
              >
                Forgot password?
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">Processing...</span>
              ) : (
                status
              )}
            </button>
          </div>
          
          {/* Toggle Login/Signup */}
          <div className="text-center mt-4">
             <p className="text-sm text-gray-600">
               {status === "Log in" ? "Don't have an account?" : "Already have an account?"}{" "}
               <span 
                 onClick={toggleStatus}
                 className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition-colors"
               >
                 {status === "Log in" ? "Create account" : "Log in"}
               </span>
             </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LogIn;