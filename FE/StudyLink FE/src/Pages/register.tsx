import { useState } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors: any = {};

        if (!form.username) newErrors.username = "Username is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.phone) newErrors.phone = "Phone number is required";
        if (!form.password) newErrors.password = "Password is required";
        if (!form.confirmPassword)
            newErrors.confirmPassword = "Confirm password is required";


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (form.email && !emailRegex.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (form.phone && !phoneRegex.test(form.phone)) {
            newErrors.phone = "Phone must be 10 digits";
        }


        if (form.password && form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }


        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const navigate = useNavigate();
    const handleSubmit = async () => {   

        if (!validate()) return;

        try {
            const response = await axios.post(
                "https://study-link-jwxa.vercel.app/api/users/register",
                {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    contactNumber: form.phone,
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error: any) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    const inputClass = (field: string) =>
        `bg-transparent outline-none text-white w-full ${errors[field] ? "border-red-500" : ""
        }`;

    const boxClass = (field: string) =>
        `flex items-center border rounded-xl px-3 py-2 mb-4 bg-black/60 ${errors[field] ? "border-red-500" : "border-green-500"
        }`;

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

                <div className="relative z-10 w-[340px]">

                    <h1 className="text-4xl font-bold text-green-500 mb-8 text-center">
                        Create Account
                    </h1>

                    {/* Username */}
                    <div className={boxClass("username")}>
                        <User className="text-green-500 mr-3" size={20} />
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className={inputClass("username")}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-500 text-sm mb-2">{errors.username}</p>
                    )}

                    {/* Email */}
                    <div className={boxClass("email")}>
                        <Mail className="text-green-500 mr-3" size={20} />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={inputClass("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                    )}

                    {/* Phone */}
                    <div className={boxClass("phone")}>
                        <Phone className="text-green-500 mr-3" size={20} />
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={inputClass("phone")}
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
                    )}

                    {/* Password */}
                    <div className={boxClass("password")}>
                        <Lock className="text-green-500 mr-3" size={20} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={inputClass("password")}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                    )}

                    {/* Confirm Password */}
                    <div className={boxClass("confirmPassword")}>
                        <Lock className="text-green-500 mr-3" size={20} />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className={inputClass("confirmPassword")}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mb-2">
                            {errors.confirmPassword}
                        </p>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2.5 rounded-full mt-4"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;