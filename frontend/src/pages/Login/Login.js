import React from "react";
import { useForm } from "react-hook-form";
import "./login.scss";

// Admin login page
const LoginPage = ({ handleLogin }) => {
  // Form managed using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // When submitting the form, attempt to log in with the provided credentials
  const onSubmit = async (data) => {
    try {
      // If successful navigate to the admin page and log a success message
      await handleLogin(data);
      console.log("Login successful!");
    } catch (error) {
      // If there was an error log an error message
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
                    type="password"
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
