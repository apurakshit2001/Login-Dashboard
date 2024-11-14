import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginSignupForm.css';
import { AuthContext } from './CreateContext/AuthContext';

const LoginSignupForm = () => {
  const {
    isLogin,
    handleLoginClick,
    handleSignupClick,
    handleLoginSubmit,
    handleSignupSubmit
  } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
    confirmPassword: !isLogin
      ? Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
      : null,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      if (isLogin) {
        handleLoginSubmit(values);
      } else {
        handleSignupSubmit(values);
      }
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <i className="bx bxs-user"></i>
                <div className="fieldChild">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
              </div>
              <div className="field">
                <i className="bx bxs-lock-alt"></i>
                <div className="fieldChild">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                </div>
              </div>
              {!isLogin && (
                <div className="field">
                  <i className="bx bxs-lock-alt"></i>
                  <div className="fieldChild">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="error">{formik.errors.confirmPassword}</div>
                    )}
                  </div>
                </div>
              )}
              <div className="field btn">
                <input type="submit" value={isLogin ? "Login" : "Signup"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
