import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const { id } = useParams();
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (currentContact) {
      setEmail(currentContact.email);
      setName(currentContact.name);
      setPhone(currentContact.phone);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      return toast.warning("Please fill all the fields!");
    }

    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );

    if (checkEmail) {
      return toast.error("This email already Exists!");
    }

    const checkPhone = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.phone === parseInt(phone)
    );

    if (checkPhone) {
      return toast.error("This phone number already Exists!");
    }

    const data = {
      id: parseInt(id),
      name,
      email,
      phone,
    };

    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Contact updated successfully");
    navigate("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5 text-center">Edit Contact {id}</h1>
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
                    value="Update Student"
                    className="btn btn-dark"
                  />
                  <Link to="/" className="btn btn-danger ms-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1>Contact does not exist!</h1>
      )}
    </div>
  );
};

export default EditContact;
