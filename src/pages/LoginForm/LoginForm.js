import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setEnteredEmail = (e) => {
    setEmail(e.target.value);
  };
  const setEnteredPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
          localStorage.setItem("userID", data.data.userID);
          toast.success("Login successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.setTimeout(function () {
            window.location.href = "./hotels";
          }, 1500);
          // window.location.href = "./hotels";
        } else {
          toast.error("Error! Login failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  return (
    <React.Fragment>
      <main className="main ">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg"> Log into your account</h2>
          <form className="form form--login" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" for="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required=""
                onChange={setEnteredEmail}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" for="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required=""
                minlength="8"
                onChange={setEnteredPassword}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Login</button>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
};

export default LoginForm;
