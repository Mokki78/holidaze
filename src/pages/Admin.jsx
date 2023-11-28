import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AdminCreate } from "../components/AdminCreate";
import { Loader } from "../components/Spinner";
import { AdminVenues } from "../components/AdminVenues";
import {Container, Row, Col} from "react-bootstrap";

export function Admin() {
  const { state } = useAuth();
  const { userDetails } = state;
  const [avatar, setAvatar] = useState("");
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  let letsNavigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));

    if (user) {
      const { name, avatar } = user;
      setName(name);
      setAvatar(avatar);

      isLoading(false);
    } else {
      letsNavigate("/admin_login");
      alert("Must be a valid Admin account");

      console.error("Error: userDetails not found or invalid");
    }
  }, []);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <Container className="d-flex flex-column">
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-center ">
          <h1 className="title">Admin Dashboard</h1>
        </div>
      )}
      <div>
        <div>
          <button className="createButton" onClick={handleClick}>
            Create
          </button>
        </div>
        <AdminVenues name={userDetails.name} />
        {openModal && <AdminCreate setOpenModal={setOpenModal} />}
      </div>
    </Container>
  );
}

export default Admin;
