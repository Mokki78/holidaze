/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ProfileBookings } from "../components/ProfileBookings";
import { UseAvatarUpdate } from "../components/AvatarUpdate";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Spinner";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Popup } from "reactjs-popup";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Profile() {
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const letsNavigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

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
  }, [letsNavigate]);

  const handleClick = () => {
    if (newAvatarUrl) {
      UseAvatarUpdate(name);
      setOpenModal(false);
    } else {
      alert("No new avatar URL provided");
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
        <Container className="d-flex justify-content-center align-items-center bg-light shadow-sm  m-4">
          <Helmet>
            <title>{name}`s profile page</title>
            <meta name="description" content="Profile page for user." />
            <meta name="keywords" content="Profile page react booking app" />
          </Helmet>

          <h1 className="title">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <div>
            <img
              src={avatar}
              className="profileImgA"
              alt={`${name}'s Avatar`}
            />
          </div>
          <Popup
            trigger={
              <button className="mainButton" onClick={() => setOpenModal(true)}>
                Change profile image
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modalOverlayAva">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="avaClose"
                  onClick={close}
                >
                  &times;
                </FontAwesomeIcon>
                <div className="myModal">
                  <label>
                    <input
                      className="avaInput"
                      placeholder="Upload a valid URL image"
                      type="text"
                      value={newAvatarUrl}
                      onChange={handleInputChange}
                    />
                  </label>

                  <div className="avaButton">
                    <Popup
                      trigger={
                        <button onClick={handleClick} className="mainButton">
                          Update
                        </button>
                      }
                      position="top center"
                      nested
                    ></Popup>
                    <button
                      className="cancelButton"
                      onClick={() => {
                        console.log("modal closed ");
                        close();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
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
