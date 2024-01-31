import React from "react";
import { useForm } from "react-hook-form";
import "./contact.scss";

//Contact page
const ContactPage = () => {
  // Form managed using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //When form is submitted, log the data
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="contact-page ">
      <div className="container ">
        <div className="contact-section">
          <h3 className="text-center contact-title">Kontakta oss</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mx-3">
              <div className="col-md-6 mx-auto">
                {/* First name label */}
                <div className="mb-3">
                  <label htmlFor="form-firstname" className="form-label">
                    Namn
                  </label>
                  <br></br>
                  {errors.first_name && (
                    <span className="form-error">&nbsp;Ange ett namn</span>
                  )}
                  <input
                    {...register("first_name", { required: true })}
                    type="text"
                    className="form-control rounded"
                    id="form-firstname"
                    placeholder="Förnamn"
                  />
                </div>

                {/* E-email */}
                <div className="mb-3">
                  <label htmlFor="form-email" className="form-label">
                    E-post
                  </label>
                  <br></br>
                  {errors.email && (
                    <span className="form-error">
                      &nbsp;Ange en giltig e-post
                    </span>
                  )}
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Ogiltig e-postadress",
                      },
                    })}
                    type="text"
                    className="form-control rounded"
                    id="form-email"
                    placeholder="E-post"
                  />
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label htmlFor="form-message" className="form-label">
                    Meddelande
                  </label>
                  <br></br>
                  {errors.message && (
                    <span className="form-error">
                      &nbsp;Skriv ett meddelande
                    </span>
                  )}
                  <textarea
                    name="message"
                    {...register("message", { required: true })}
                    className="form-control rounded"
                    id="form-message"
                    placeholder="Ditt meddelande..."
                  />
                </div>

                <button type="submit" className="btn">
                  Skicka
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
