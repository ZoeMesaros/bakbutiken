import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";

//Login page component to access the admin dashboard
const LoginPage = ({ handleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await handleLogin(data);

      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-section">
          <h3 className="text-center contact-title">Logga in</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mx-3">
              <div className="col-md-6 mx-auto">
                <div className="mb-3">
                  <label htmlFor="username">Användarnamn</label>
                  <br></br>
                  {errors.username && (
                    <span className="form-error">
                      &nbsp;Ange ett användarnamn
                    </span>
                  )}
                  <br></br>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    className="form-control rounded"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Lösenord</label>
                  <br></br>
                  {errors.password && (
                    <span className="form-error">&nbsp;Ange ett lösenord</span>
                  )}
                  <br></br>
                  <input
                    {...register("password", { required: true })}
                    type="text"
                    className="form-control rounded"
                    id="password"
                    name="password"
                  />
                </div>
                <button type="submit" className="btn">
                  Logga in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
