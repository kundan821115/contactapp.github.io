import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      return toast.warning("Please fill all the fields!");
    }

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    if (checkEmail) {
      return toast.error("This email already Exists!");
    }

    const checkPhone = contacts.find(
      (contact) => contact.phone === parseInt(phone) && phone
    );

    if (checkPhone) {
      return toast.error("This phone number already Exists!");
    }

    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phone,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact added successfully");
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 my-5 text-center">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group my-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group my-3">
              <input
                type="number"
                placeholder="Phone Number"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div className="form-group my-3">
              <input
                type="submit"
                value="Add Student"
                className="btn btn-dark btn-block w-100"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
