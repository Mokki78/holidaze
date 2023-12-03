/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadOnly } from "../components/ReadOnly";
import { Update } from "../components/Update";
import { Loader } from "../components/Spinner";
import { Container, Row, Col } from "react-bootstrap";

export const AdminVenues = ({ name, setOpenLocalModal }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [venue, setVenue] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();

  const [editFormData, setEditFormData] = useState({
    name: " ",
    description: "",
    media: "",
    price: "",
    maxGuests: "",
    rating: "",
    wifi: "",
    parking: "",
    breakfast: "",
    pets: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    let fieldValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (fieldName === "price") {
      fieldValue = parseFloat(fieldValue);
    }

    if (fieldName === "maxGuests") {
      fieldValue = parseFloat(fieldValue);
    }

    if (fieldName === "rating") {
      fieldValue = parseFloat(fieldValue);
    }

    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setVenue({});
        } else {
          console.error("Error fetching venues");
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching venues", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues(name);
  }, [name]);

  const handleDelete = async (venueId, event) => {
    console.log("My venueId:", venueId);
    console.log("Event:", event);
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("Are you sure you want to delete this venue?");

      if (response.ok) {
        console.log("You have successfully deleted the venue");
        console.log("My venue id:", venueId);
        alert("Your have successfully deleted this venue!");
      } else {
        console.error("Error deleting venue");
      }
    } catch (error) {
      console.error("An error has occurred", error);
    }
  };

  const [editVenueId, setEditVenueId] = useState(null);

  const handleEditClick = (event, venue) => {
    event.preventDefault();

    const formValues = {
      name: venue.name,
      description: venue.description,
      media: venue.media,
      price: venue.price,
      maxGuests: venue.maxGuests,
      rating: venue.rating,
      wifi: venue.meta.wifi,
      parking: venue.meta.parking,
      breakfast: venue.meta.breakfast,
      pets: venue.meta.pets,
      address: venue.location.address,
      city: venue.location.city,
      country: venue.location.country,
    };

    setEditFormData(formValues);
    setEditVenueId(venue.id);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${editVenueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (response.ok) {
        console.log("Venue updated successfully");
        setOpenLocalModal(false);
        navigate("/admin");

        alert("Venue updated successfully!");
      } else {
        console.error("Error updating venue");
        alert("Error updating venue");
      }
    } catch (error) {
      console.error("An error occurred while updating venue", error);
      alert("An error occurred while updating venue");
    }
  };

  const ShowAdminVenues = () => {
    return (
      <Container className="pt-5">
        <h1 className="subTitle">Your venues:</h1>
        <Row sm={1} md={2} lg={2}>
          {data.map((venue) => (
            <Col className="col-12 col-sm-6 p-3 d-flex flex-row" key={venue.id}>
              <div className="card h-100 p-2 m-2 d-flex align-items-center">
                <div>
                  <img
                    src={venue.media}
                    height="250px"
                    width="100%"
                    alt={venue.title}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {editVenueId === venue.id ? (
                  <Update
                    setOpenLocalModal={setOpenLocalModal}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnly
                    venue={venue}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <ShowAdminVenues />
      )}
    </div>
  );
};

export default AdminVenues;
