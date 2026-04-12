import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { StoreContext } from "../context/store";

interface Props {
  onClose: () => void;
  onBackToLogin: () => void;
}

function ForgotPassword({ onClose, onBackToLogin }: Props) {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/user/forgot-password`, { email });
      if (response.data.success) {
        setSent(true);
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex fixed inset-0 z-100 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Forgot Password</h2>
            <p className="mt-1 text-sm text-gray-600">
              {sent
                ? "Check your inbox for the reset link."
                : "Enter your email and we'll send you a reset link."}
            </p>
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-green-600 font-medium">Reset email sent successfully.</p>
            <p className="text-sm text-gray-500 mt-1">Didn't receive it? Check your spam folder.</p>
          </div>
        )}

        <div className="text-center">
          <span
            onClick={onBackToLogin}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Back to Log in
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
