import React, { useState } from "react";
import { ReactComponent as Checkbox } from "./images/icon-checkbox-check.svg";
import { ReactComponent as Select } from "./images/icon-radio-selected.svg";
import { ReactComponent as Success } from "./images/icon-success-check.svg";
const App = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    checkbox: false,
    Fname: "",
    Lname: "",
    textField: "",
    radioBtn: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    Fname: "",
    Lname: "",
    radioBtn: "",
    textField: "",
    checkbox: "",
  });
  const [success, setSuccess] = useState(false);
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {
      email: "",
      Fname: "",
      Lname: "",
      radioBtn: "",
      checkbox: "",
      textField: "",
    };

    if (!validateEmail(formValues.email)) {
      newErrors.email = "Please enter a valid email address";
      formIsValid = false;
    }

    if (!formValues.Fname) {
      newErrors.Fname = "This field is required";
      formIsValid = false;
    }
    if (!formValues.Lname) {
      newErrors.Lname = "This field is required";
      formIsValid = false;
    }
    if (!formValues.textField) {
      newErrors.textField = "This field is required";
      formIsValid = false;
    }
    if (!formValues.radioBtn) {
      newErrors.radioBtn = "Please select a query type";
      formIsValid = false;
    }
    if (!formValues.checkbox) {
      newErrors.checkbox =
        "To submit this form, please consent to being contacted";
      formIsValid = false;
    }
    setErrors(newErrors);

    if (formIsValid) {
      setSuccess(true);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <div className="successContainer">
          <div>
            <Success />
            <h2>Message Sent!</h2>
          </div>
          <p>Thanks for completing the form, We'll be in touch soon!</p>
        </div>
      )}
      <h2>Contact Us</h2>
      <div className="nameContainer">
        <div className="fName">
          <label>
            <span> First Name *</span>
            <input
              type="text"
              name="Fname"
              value={formValues.Fname}
              onChange={handleChange}
              className={`${errors.Fname ? "errorBorder" : ""}`}
            />
          </label>
          {errors.Fname && <p className="error">{errors.Fname}</p>}
        </div>
        <div className="lName">
          <label>
            <span>Last Name *</span>
            <input
              type="text"
              name="Lname"
              value={formValues.Lname}
              onChange={handleChange}
              className={`${errors.Lname ? "errorBorder" : ""}`}
            />
          </label>
          {errors.Lname && <p className="error">{errors.Lname}</p>}
        </div>
      </div>
      <div className="email">
        <label>
          <span>Email Address *</span>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={`${errors.email ? "errorBorder" : ""}`}
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="radio">
        <span className="query">Query Type *</span>
        <div>
          <label
            className={`${
              formValues.radioBtn === "option1" ? "optionChecked" : ""
            }`}
          >
            <input
              type="radio"
              name="radioBtn"
              value="option1"
              checked={formValues.radioBtn === "option1"}
              onChange={handleChange}
            />
            <span
              className={`wrapper ${
                formValues.radioBtn === "option1" ? "selected" : "unSelected"
              }`}
            >
              {formValues.radioBtn === "option1" && <Select className="icon" />}
            </span>
            <p>General Enquiry</p>
          </label>
          <label
            className={`${
              formValues.radioBtn === "option2" ? "optionChecked" : ""
            }`}
          >
            <input
              type="radio"
              name="radioBtn"
              value="option2"
              checked={formValues.radioBtn === "option2"}
              onChange={handleChange}
            />
            <span
              className={`wrapper ${
                formValues.radioBtn === "option2" ? "selected" : "unSelected"
              }`}
            >
              {formValues.radioBtn === "option2" && <Select className="icon" />}
            </span>

            <p>Support Request</p>
          </label>
        </div>{" "}
        {errors.radioBtn && (
          <p className={"radioBtnError error"}>{errors.radioBtn}</p>
        )}
      </div>
      <div>
        <label>
          <span>Message *</span>
          <textarea
            name="textField"
            value={formValues.textField}
            onChange={handleChange}
            rows="4"
            cols="50"
            className={`${errors.textField ? "errorBorder" : ""}`}
          />
        </label>{" "}
        {errors.textField && <p className="error">{errors.textField}</p>}{" "}
      </div>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="checkbox"
            checked={formValues.checkbox}
            onChange={handleChange}
            className="hidden"
          />
          <span className="checkboxWrapper">
            {formValues.checkbox ? (
              <Checkbox className="checkboxIcon" />
            ) : (
              <div className="unChecked"></div>
            )}
          </span>
          I consent to being contacted by the team*
        </label>{" "}
        {errors.checkbox && <p className="error">{errors.checkbox}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
