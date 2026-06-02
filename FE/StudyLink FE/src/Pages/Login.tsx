import { Mail, Lock } from "lucide-react";

function Login() {
  return (
    <div className="w-full h-screen bg-black flex overflow-hidden">


      <div className="hidden md:block w-1/2 h-full">
        <img
          src="\src\assets\Loginimage..jpg"
          alt="student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] border-8 border-green-500 rounded-full opacity-40 blur-sm"></div>

        {/* Card */}
        <div className="relative z-10 w-[320px]">

          {/* Logo */}
          <h1 className="text-4xl font-bold text-green-500 mb-10 text-center">
            StudyLink
          </h1>

          {/* Email */}
          <div className="flex items-center border border-green-500 rounded-xl px-3 py-2 mb-5 bg-black/60">
            <Mail className="text-green-500 mr-3" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white text-base w-full"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-green-500 rounded-xl px-3 py-2 mb-6 bg-black/60">
            <Lock className="text-green-500 mr-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white text-base w-full"
            />
          </div>

          {/* Login */}
          <button className="w-full bg-green-500 hover:bg-green-400 text-black text-base font-semibold py-2.5 rounded-full mb-4">
            Log In
          </button>

          {/* Create Account */}
          <button className="w-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-black text-base font-semibold py-2.5 rounded-full mb-4">
            Create Account
          </button>

          {/* Forgot */}
          <p className="text-green-400 text-sm text-center cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;