import React, { useContext } from 'react';
import './LoginSignupForm.css';
import { AuthContext } from './CreateContext/AuthContext';

const LoginSignupForm = () => {
  const {
    isLogin,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleLoginClick,
    handleSignupClick,
    handleLoginSubmit,
    handleSignupSubmit
  } = useContext(AuthContext);

  return (
    <div className="loginContainer">
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? 'login' : 'signup'}`}>
            {isLogin ? 'Login Form' : 'Signup Form'}
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLogin} onChange={handleLoginClick} />
            <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={handleSignupClick} />
            <label htmlFor="login" className="slide login" onClick={handleLoginClick}>Login</label>
            <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>Signup</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            {isLogin ? (
              <form className="login" onSubmit={handleLoginSubmit}>
                <div className="field">
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Email Address" required ref={emailRef} />
                </div>
                <div className="field">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Password" required ref={passwordRef} />
                </div>
                <div className="field btn">
                  <input type="submit" value="Login" />
                </div>
                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="signup-link">
                  Not a member? <a href="#" onClick={handleSignupClick}>Signup now</a>
                </div>
              </form>
            ) : (
              <form className="signup" onSubmit={handleSignupSubmit}>
                <div className="field">
                  <i className="bx bxs-envelope"></i>
                  <input type="text" placeholder="Email Address" required ref={emailRef} />
                </div>
                <div className="field">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Password" required ref={passwordRef} />
                </div>
                <div className="field">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Confirm password" required ref={confirmPasswordRef} />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
