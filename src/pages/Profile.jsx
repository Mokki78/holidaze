import React, { useState, useEffect } from "react";

export function Profile() {
  const [avatar, setAvatar] = useState("");
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  
    if (userDetails) {
      const { name, avatar } = userDetails;
  
      setName(name);
      setAvatar(avatar);
    } else {
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
          <img src={avatar} height="200px" alt={`${name}'s Avatar`} />
          </div>
      
         
        </div>
      )}
    </div>
  );
}

export default Profile;
