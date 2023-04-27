import React, { useState } from "react";
import "../stylesheets/Login-Signup.css";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockOpenAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import BeatLoader from "react-spinners/BeatLoader";

interface LoginDataInterface {
  email: string;
  password: string;
}

const Login = () => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataInterface>({
    resolver: yupResolver(schema),
  });

  const loginHandler = async (data: LoginDataInterface) => {
    console.log("login data:", data);
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      sessionStorage.setItem("logged-in", "true");
      sessionStorage.setItem("auth-key", result.user.uid);
      navigate("/feeds");
      setLoginError(false);
      setIsLoading(false);
    } catch (error) {
      console.log("login error", error);
      setLoginError(true);
      setIsLoading(false);
    }
  };
  return (
    <main className="login-container">
      <section className="login-main-div">
        <div className="login-greeting">
          <img src={require("../assets/greeting-2.png")} alt="greeting-img" />
          <h1>Welcome back!</h1>
          <p>Login to your existing account of Sosially</p>
        </div>
        <form onSubmit={handleSubmit(loginHandler)}>
          <div className="login-input">
            <HiOutlineMail className="mail-icon" />
            <input type="email" placeholder="Email" {...register("email")} />
          </div>
          {errors.email && (
            <span className="error-msg">{errors.email.message}</span>
          )}
          <div className="login-input">
            <BiLockOpenAlt className="password-icon" />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="error-msg">{errors.password.message}</span>
          )}
          {loginError && (
            <span className="error-msg">email or password is wrong</span>
          )}
          <div className="login-btn-div">
            <button type="submit">
              {isLoading ? (
                <BeatLoader
                  color={"white"}
                  loading={true}
                  size={14}
                  margin={0}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="login-last-div">
          <p>Don't have an account?</p>
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </div>
      </section>
    </main>
  );
};

export default Login;
