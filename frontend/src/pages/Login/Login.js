import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import useAuth from "../../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

// Admin login page
const LoginPage = () => {
  // Form managed using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // Navigate to admin page after successful login
  const navigate = useNavigate();

  // useAuth hook for handling authentication and login
  const { isLoggedIn, login } = useAuth();

  // Effect to redirect if admin is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  // When submitting the form, attempt to log in with the provided credentials
  const onSubmit = async (data) => {
    try {
      await login(data);
      console.log("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error.message);

      // Error message for wrong password
      if (error.message === "WrongPassword") {
        setError("password", {
          type: "manual",
          message: "Fel lösenord, försök igen.",
        });
      }
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
                  <br />
                  {errors.username && (
                    <span className="form-error">
                      {errors.username.message}
                    </span>
                  )}
                  <br />
                  {/* Username */}
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
                  <br />
                  {errors.password && (
                    <span className="form-error">
                      {errors.password.message}
                    </span>
                  )}
                  <br />
                  {/* Password */}
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
