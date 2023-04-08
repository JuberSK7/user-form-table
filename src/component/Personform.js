import React, { useState, useRef } from "react";
import Personlist from "./Personlist";
import Person from "../assest/person.png";
import Select from "react-select";
import Cities from "../constant.js";
import "./style.css";

const Personform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [pincode, setPincode] = useState("");
  const [persons, setPersons] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "city":
        setSelectedCity(value);
        break;
      case "pincode":
        setPincode(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const errors = {};
    const regexMobile = /^[0-9]{10,14}$/;
    const regexPincode = /^[0-9]{6}$/;

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!dob) {
      errors.dob = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        errors.dob = "You must be at least 18 years old";
      }
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!regexMobile.test(mobile)) {
      errors.mobile = "Invalid mobile number format";
    }

    if (!selectedCity) {
      errors.selectedCity = "City is required";
    }

    if (!pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!regexPincode.test(pincode)) {
      errors.pincode = "Invalid pincode format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newPerson = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob,
      email: email.trim(),
      mobile: mobile.trim(),
      selectedCity: selectedCity.value,
      pincode: pincode.trim(),
    };

    setPersons([...persons, newPerson]);
    setFirstName("");
    setLastName("");
    setDob("");
    setEmail("");
    setMobile("");
    setSelectedCity("");
    setPincode("");
  };

  console.log("selected", selectedCity.value);

  return (
    <div className="container">
      <div className="box1">
        <img src={Person} alt="person_logo" className="person_logo" />
        <h2 className="form_heading">Add Person</h2>
        <form onSubmit={addPerson} className="form">
          <div className="form_child">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={handleInputChange}
            />
          </div>
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
          <div className="form_child">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>
          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <div className="form_child">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="Enter Your Date Of Birth"
              value={dob}
              onChange={handleInputChange}
            />
          </div>
          {errors.dob && <span className="error">{errors.dob}</span>}
          <div className="form_child">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <span className="error">{errors.email}</span>}
          <div className="form_child">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              value={mobile}
              onChange={handleInputChange}
            />
          </div>
          {errors.mobile && <span className="error">{errors.mobile}</span>}
          <div className="form_child">
            <label htmlFor="city">City</label>
            <Select
              value={selectedCity}
              onChange={(item) => setSelectedCity(item)}
              options={Cities}
              isSearchable={true}
              placeholder="Select a city"
              id="city"
              name="city"
              
            />
          </div>
          {errors.selectedCity && <span className="error">{errors.selectedCity}</span>}
          <div className="form_child">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Your Pin / Zip code"
              value={pincode}
              onChange={handleInputChange}
            />
          </div>
          {errors.pincode && <span className="error">{errors.pincode}</span>}
          <button type="submit" className="add_btn">
            Add Person
          </button>
        </form>
      </div>
      <Personlist persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default Personform;
