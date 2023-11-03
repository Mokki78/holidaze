import React, { useState, useEffect} from "react";
import { ProfileBookings } from "../components/ProfileBookings";


import { useNavigate } from "react-router-dom";

export function Profile() {
  const [avatar, setAvatar] = useState("");
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");

  const letsNavigate = useNavigate();


  useEffect(() => {

    const userDetails = JSON.parse(localStorage.getItem("userDetails"))
    
    if (userDetails) {
      const { name, avatar } = userDetails;
      setName(name);
      setAvatar(avatar);
      isLoading(false);
    } else {
      letsNavigate("/login");
      alert("Please enter valid Username or password")

      console.error("Error: userDetails not found or invalid");
    }
  }, []);

 
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{name}</h1>
          <div>
            <img src={avatar} height="150px" alt={`${name}'s Avatar`} />
          </div>
        </div>
      )}
      <div>
        <ProfileBookings name={name}/>
      
      </div>
    </div>
  );
}

export default Profile;
