import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AdminCreate } from "../components/AdminCreate";
import { Loader } from "../components/Spinner";
import { AdminVenues } from "../components/AdminVenues";
import {Container} from "react-bootstrap";
import { Helmet } from "react-helmet";


export function Admin() {
  const { state } = useAuth();
  const { userDetails } = state;
  const [avatar, setAvatar] = useState("");
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [venues, setVenues] = useState([]);

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

  const handleVenueCreated = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
  };


return (
  <div>
    {loading ? (
      <Loader />
    ) : (
      <Container className="d-flex justify-content-center align-items-center bg-light shadow-sm p-3 m-4">
          <Helmet>
            <title>Holidaze Admin Dashboard</title>
            <meta name="description" content="Admin page." />
            <meta name="keywords" content="Admin page react booking app" />
          </Helmet>
          <div className="d-flex flex-row justify-content-center align-items-center ">
          <h1 className="title">Admin Dashboard</h1>
          <div>
          <button className="createButton" onClick={handleClick}>
            Create
          </button>
          </div>
        </div>
      </Container>
    )}
     <AdminVenues name={userDetails.name} />
        {openModal && <AdminCreate setOpenModal={setOpenModal}  onVenueCreated={handleVenueCreated} />}
   </div>
);
}

export default  Admin;
