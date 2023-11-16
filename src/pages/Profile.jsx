import React, { useState, useEffect } from "react";
import { ProfileBookings } from "../components/ProfileBookings";
import { UseAvatarUpdate } from "../components/AvatarUpdate";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const letsNavigate = useNavigate();

  const { isLoading: avatarUpdateLoading, isError: avatarUpdateError } =
    UseAvatarUpdate(name);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      const { name, avatar } = userDetails;
      setName(name);
      setAvatar(avatar);
      setLoading(false);
    } else {
      letsNavigate("/login");
      alert("Please enter a valid Username or password");
      console.error("Error: userDetails not found or invalid");
    }
  }, []);

  const handleClick = () => {
    
    if (newAvatarUrl) {
  
      UseAvatarUpdate(name);
    } else {
      console.log("No new avatar URL provided");
    }
  };

  const handleInputChange = (e) => {
    setNewAvatarUrl(e.target.value);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{name}</h1>
          <div>
            <img src={avatar} height="150px" alt={`${name}'s Avatar`} />

            <form>
              <label>
                Upload a valid URL image
                <input
                  type="text"
                  value={newAvatarUrl}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleClick}>
                Update your profile img
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <ProfileBookings name={name} />
      </div>
      {avatarUpdateLoading && <p>Updating avatar...</p>}
      {avatarUpdateError}
    </div>
  );
}

export default Profile;
