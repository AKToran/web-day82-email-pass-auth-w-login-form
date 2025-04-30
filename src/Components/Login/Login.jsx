import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");
    setSuccessMessage(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        
        if(!user.emailVerified){
          alert("Please verify your Email address.")
        }
        else{
          setSuccessMessage(true);
        }
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Firebase: Error (auth/invalid-credential).") {
          setErrorMessage("Invalid Email or Password!");
        }
      });
  };

  return (
    <div className="mx-auto max-w-96 mt-10 shadow-2xl p-8">
      <h3 className="text-3xl mt-8 mb-5 font-bold text-center">Login</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <label className="label mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input"
            placeholder="Password"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="hover:cursor-pointer absolute right-2 bottom-3 z-20"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <input className="btn w-fit" type="submit" value="Login" />
      </form>
      <p className="py-4">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-blue-600 underline">
          SignUp
        </Link>
      </p>
      {errorMessage && <p className="text-red-500 py-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 py-2">Login Successful.</p>
      )}
    </div>
  );
};

export default Login;
