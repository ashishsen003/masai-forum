import React from "react";
import loginImage from "../assets/loginImage.svg";
import circle from "../assets/circle.svg";
import "./login.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

  const loginWithGoogle = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="login__page">
      <div className="login__img__div">
        <img src={loginImage} alt="" />
      </div>
      <div className="form__div">
        <div>
          <div className="title__logo__div">
            <span><img src={circle} alt="" /></span>
            <span className="title">MASAI FORUM</span>
          </div>
          <p className="msg">Nice to see you again</p>
          <form>
            <label>Login</label>
            <input type="text" placeholder="email" className="input" />
            <br />
            <label className="password__label">Password</label>
            <br />
            <input type="password" placeholder="password" className="input" />
            <div className="forget__div">
              <div className="rem__div">
                <input id="rem__input" type="checkbox" /><span>Remember me</span>
              </div>
              <div>
                <a href="#">Forget password?</a>
              </div>
            </div>
            <button className="signin__btn">Sign in</button>
          </form>
          <hr />
          <button onClick={loginWithGoogle} className="goggle__btn">
            <FcGoogle className="logo" /> Or sign in with Google
          </button>
          <br />
          <p className="signup__btn">
            <span>Dont have any account?</span>{" "}
            <Link className="link__btn" to="/register">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
