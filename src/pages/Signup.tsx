import React, { useState } from "react";
import "../stylesheets/Login-Signup.css";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockOpenAlt } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";

interface SignupDataInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().min(6).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined])
      .required("password should be same as above"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDataInterface>({
    resolver: yupResolver(schema),
  });
  const signUpHandler = async (data: SignupDataInterface) => {
    console.log("calling function", data);
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(result);
      const newUserDoc = doc(collection(db, "users"));
      const newConnectionDoc = doc(collection(db, "connections"));
      await setDoc(newUserDoc, {
        email: data.email,
        username: data.username,
        userId: result?.user.uid,
        id: newUserDoc.id,
        avatar: "",
      });
      await setDoc(newConnectionDoc, {
        connections: [],
        uid: result?.user.uid,
        id: newConnectionDoc.id,
      });
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      console.log("inside the catch block", err);
      setIsLoading(false);
    }
  };
  return (
    <main className="signup-container">
      <section className="signup-main-div">
        <div className="signup-greeting">
          <h1>Let's Get Started!</h1>
          <p>Create an account to Sosially to get all features</p>
        </div>
        <form onSubmit={handleSubmit(signUpHandler)}>
          <div className="signup-input">
            <BiUser className="avatar-icon" />
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <span className="error-msg">{errors.username.message}</span>
          )}
          <div className="signup-input">
            <HiOutlineMail className="mail-icon" />
            <input type="email" placeholder="Email" {...register("email")} />
          </div>
          {errors.email && (
            <span className="error-msg">{errors.email.message}</span>
          )}
          <div className="signup-input">
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
          <div className="signup-input">
            <BiLockOpenAlt className="password-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error-msg">{errors.confirmPassword.message}</span>
          )}
          <div className="signup-btn-div">
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
                "Signup"
              )}{" "}
            </button>
          </div>
        </form>
        <div className="signup-last-div">
          <p>Already have an account?</p>
          <span onClick={() => navigate("/login")}>Login Here</span>
        </div>
      </section>
    </main>
  );
};

export default Signup;
