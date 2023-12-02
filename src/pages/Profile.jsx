import React, { useState, useEffect } from "react";
import { ProfileBookings } from "../components/ProfileBookings";
import { UseAvatarUpdate } from "../components/AvatarUpdate";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Spinner";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";


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
        <Loader />
      ) : (
        <Container className="d-flex justify-content-center align-items-center bg-light shadow-sm p-3 m-4">
             <Helmet>
            <title>{name}`s profile page</title>
            <meta name="description" content="Profile page for user." />
            <meta name="keywords" content="Profile page react booking app" />
          </Helmet>
          <h1 className="title">{name}</h1>
          <div>
            <img
              src={avatar}
              className="profileImgA"
              alt={`${name}'s Avatar`}
            />

            <form>
              <label>
                <input
                  placeholder="Upload a valid URL image"
                  type="text"
                  value={newAvatarUrl}
                  onChange={handleInputChange}
                />
              </label>
              <button
                type="button"
                className="mainButton"
                onClick={handleClick}
              >
                Update img
              </button>
            </form>
          </div>
        </Container>
      )}
      <div>
        {ProfileBookings.length > 0 ? (
          <ProfileBookings name={name} />
        ) : (
          <h3>You have no bookings yet</h3>
        )}
      </div>
      {avatarUpdateLoading && <p>Updating avatar...</p>}
      {avatarUpdateError}
    </div>
  );
}

export default Profile;
