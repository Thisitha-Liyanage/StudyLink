import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };
  return (
    <div className="w-full h-screen bg-black flex overflow-hidden">

      {/* Left Image */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="\Loginimage..jpg"
          alt="student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black">

        <div className="relative z-10 w-[320px]">

          <h1 className="text-4xl font-bold text-green-500 mb-10 text-center">
            StudyLink
          </h1>

          {/* Email */}
          <div
            className={`flex items-center border rounded-xl px-3 py-2 mb-2 bg-black/60 ${errors.email
                ? "border-red-500"
                : "border-green-500"
              }`}
          >
            <Mail className="text-green-500 mr-3" size={20} />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mb-4">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <div
            className={`flex items-center border rounded-xl px-3 py-2 mb-2 bg-black/60 ${errors.password
                ? "border-red-500"
                : "border-green-500"
              }`}
          >
            <Lock className="text-green-500 mr-3" size={20} />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mb-4">
              {errors.password}
            </p>
          )}

          {/* Login */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2.5 rounded-full mb-4"
          >
            Log In
          </button>

          {/* Create Account */}
          <button
            onClick={() => navigate("/register")}
            className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-semibold py-2.5 rounded-full mb-4"
          >
            Create Account
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;