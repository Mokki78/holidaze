import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../context/AuthContext";
import { AdminCreate} from "../components/AdminCreate";

import { AdminVenues} from "../components/AdminVenues";

export function Admin() {
  const { state } = useAuth();
  const { userDetails } = state;
  const [avatar, setAvatar] = useState("");
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
 
  
  

  const letsNavigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));

    if (user) {
      const { name, avatar } = user;
      setName(name);
      setAvatar(avatar);
      
      isLoading(false);
    } else {
      letsNavigate("/admin_login");
      alert("Must be a valid Admin account")

      console.error("Error: userDetails not found or invalid");
    }
  }, []);

  const handleClick = () => { setOpenModal(true);
  }



  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{name}</h1>
          <div>
            <img src={avatar} width="200px" alt={`${name}'s Avatar`} />
          </div>
        </div>
      )}
      <div>
      <div>
            <button onClick={handleClick}>
            Create new venue
            </button>
            
          </div>
          <AdminVenues name={userDetails.name}/>
        {openModal && <AdminCreate  setOpen={setOpenModal}  />}
      </div>
    </div>
  );
}

export default Admin;
