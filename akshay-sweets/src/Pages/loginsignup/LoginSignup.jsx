import React, { useState } from "react";
import "./LoginSignup.css";
export const LoginSignup = () => {
  const [state, setstate] = useState("Login");
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

const changeHandler = (e)=>{
  setFormData({...formdata,[e.target.name]:e.target.value})
  }
  const login = async () => {
    console.log("login success " ,formdata);
    let responcedata 
    await fetch("https://akshay-sweets-backend-1.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    }).then((resp)=>resp.json()).then((data)=>responcedata=data)
    if(responcedata.success){
      localStorage.setItem('auth-token',responcedata.token)
      window.location.replace("/")
    }
    else{
      alert(responcedata.error)
    }
  };
  const signup = async () => {
    console.log("sing up success ",formdata);
    let responcedata 
    await fetch("https://akshay-sweets-backend-1.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    }).then((resp)=>resp.json()).then((data)=>responcedata=data)
    if(responcedata.success){
      localStorage.setItem('auth-token',responcedata.token)
      window.location.replace("/")
    }
    else{
      alert(responcedata.error)
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="fields">
          {state === "Sign Up" ? (
            <input name="username" value={formdata.username} onChange={changeHandler} type="text" placeholder="YOUR name" />
          ) : (
            <></>
          )}
          <input name="email" value={formdata.email} onChange={changeHandler} type="email" placeholder="YOUR E-mail" />
          <input name="password" value={formdata.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button> 
        {state === "Sign Up" ? (
          <p className="login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setstate("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="login">
            Create an acount{" "}
            <span
              onClick={() => {
                setstate("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}

        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>i agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};
