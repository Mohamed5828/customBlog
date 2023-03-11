import React, { useState } from "react";
import "../Styling/components/newsletter.css";
function Newsletter() {
  const [formData, setFormData] = useState({
    email: "",
  });
  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }
  return (
    <div className="newsletter">
      {/* <label htmlFor="email" className="email-label">
        Sign Up for Newsletter:
      </label> */}
      <input
        className="email-input"
        type="email"
        placeholder="Enter Email"
        name="email"
        onChange={handleChange}
      />
      <input className="submit-newsletter" type="submit" value={"Submit"} />
    </div>
  );
}

export default Newsletter;
