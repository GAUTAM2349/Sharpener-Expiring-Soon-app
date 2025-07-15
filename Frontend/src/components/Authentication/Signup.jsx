import { useContext, useState } from "react";
import api from "../../../config/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/contexts/AuthProvider";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/register", {
        name,
        email,
        password,
      });

      const { token } = res.data;

      if (res.status === 201 ) {
        localStorage.setItem("token", token);
        console.log("Signup successful and token stored.");
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 0);
      } else {
        console.log("Unexpected signup response:", res);
      }
    } catch (err) {
      console.log("Signup Failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row items-center justify-center px-4">
       <h1 className="absolute top-0 sm:relative text-3xl  md:text-5xl font-sans font-bold text-blue-900 px-4 py-8  m-0 sm:mr-[30px]"> Dispose, if it's expired!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-blue-900 p-8 py-30 rounded-lg shadow-lg flex flex-col justify-between min-h-[450px]"
      >
        <h2 className="text-white pb-10">Let’s get you signed up!</h2>
        <div className="flex-1">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-100"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="your-email@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
        <span onClick={()=>navigate('/login')} className="mt-7 text-white cursor-pointer">Already a user? <span className="underline">Login</span></span>
      </form>
      
    </div>
  );
}

export default Signup;
