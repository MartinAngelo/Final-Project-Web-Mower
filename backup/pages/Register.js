import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "../utils/firebase";

import pusa from '../pic/pusa1.png'

export default function Register() {
  const db = firebase.firestore();


  const [payload, setPayload] = useState({
    email: "",
    pass: "",
    confirmPass: "",
  });



  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };


  const history = useHistory();
  const register = (e) => {
    e.preventDefault();

    if (!payload.email || !payload.pass || !payload.confirmPass) {
      alert("Please Complete all fields!")

    } else if (payload.pass !== payload.confirmPass) {
      alert("Password does not match!");
    } else if (payload.pass.length < 5) {
      alert("Password should be at least 6 characters")


    } else {
      //backend
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then((signedInUser) => {
          //registered and signed in  
          alert("Registered and signed in as " + signedInUser.user.email);
          console.log(signedInUser.user);

          const currentUser = firebase.auth().currentUser;
          db.collection("users")
            .doc(currentUser.uid)
            .set({
              firstName: "First Name",
              lastName: "Last Name",
              bioDesc: "",
              locDesc: "",
              username: payload.email,
              profilePic: false,

            })
            .then(() => {
              var storage = firebase.storage();
              var storageRef = storage.ref();
              var uploadTask = storageRef.child("images/" + currentUser.uid).put(".././assets/images/profile.png");
              uploadTask.then(() => {
                history.push("/createprofile");



              })

            });
        })
        .catch((err) => {
          alert(err.message);
        });

    }
  };

  return (
    <div className="container1">
      <div className="left">
        <div className="header1">
          <img src={pusa} className="pusa" alt="logo" />
          <h1 className="animation a1">Meower</h1>

          <h2 className="animation a1">Welcome New User</h2>
          <h4 className="animation a2">Create your Account</h4>
        </div>
        <div className="form">

          <label htmlFor="username">Email</label>
          <input

            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange("email")}
            value={payload.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            label="Password"
            name="password"
            id="password"
            onChange={handleChange("pass")}
            value={payload.pass}
            autoComplete="current-password"
          />

          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            type="password"
            name="confirmPass"
            label="Confirm Password"
            id="confirmPass"
            onChange={handleChange("confirmPass")}
            value={payload.confirmPass}
          />

          <button className="animation a6" onClick={register}>Register</button>
        </div>

        <p>Already have account? <Link to="./login">Log in</Link></p>
      </div>

      <div className="right"></div>

    </div >

  );
}


