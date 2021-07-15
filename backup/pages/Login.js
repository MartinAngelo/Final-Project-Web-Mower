import React, { useState } from "react";

import {  Link } from "react-router-dom";
import pusa from '../pic/pusa1.png'
import firebase from "../utils/firebase";
export default function Login() {
  const [payload, setPayload] = useState({
    email: "",
    pass: "",

  });

  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();

    if (!payload.email || !payload.pass) {
      alert("Please Complete all fields!")
    } else {
      //backend
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then((signedInUser) => {
          //signed in  
          alert("Signed in as " + signedInUser.user.email);
          console.log(signedInUser.email);
        })
        .catch((error) => {
          //var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });
    }
  };

  return (

    <div className="container1">
      <div className="left">
        <div className="header1">
          <img src={pusa} className="pusa" alt="logo" />
          <br />
          <h1 className="animation a1">Meower </h1>
          <h2 className="animation a1">Welcome Back</h2>
          <h4 className="animation a2">Log in to your account using email and password</h4>
        </div>
        <div className="form">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={handleChange("email")}
            value={payload.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            label="Password"
            id="emails"
            
            autoComplete="current-password"
            onChange={handleChange("pass")}
            value={payload.pass}
          />
          <button className="animation a6" onClick={register}>LOGIN</button>
        </div>
        <p>Don't have an account? <Link to="./register">Sign up</Link></p>
      </div>

      <div className="right"></div>

    </div >
  );
}