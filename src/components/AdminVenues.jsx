import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReadOnly } from "../components/ReadOnly";
import { Update } from "../components/Update";

export const AdminVenues = ({ name }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [venue, setVenue] = useState({});
  let { id } = useParams();

  const [editFormData, setEditFormData] = useState({
    name: "",
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
    let fieldValue = event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
  
    // Convert price to a number
    if (fieldName === "price") {
      fieldValue = parseFloat(fieldValue);
    }

    if (fieldName === "maxGuests") {
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
  }


  const [editVenueId, setEditVenueId] = useState(null);

  const handleEditClick = (event, venue) => {
    event.preventDefault();
    setEditVenueId(venue.id);

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
      zip: venue.location.zip,
      country: venue.location.country,
      continent: venue.location.continent,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Form Data before submit:", editFormData);

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

      console.log("My formdata:", editFormData)

      if (response.ok) {
        console.log("Venue updated successfully");
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
      <>
        <h1>Your venues:</h1>
        <div className="venues d-flex justify-content-center align-items-center">
       
            <div className="row">
              {data.map((venue) => (
                <>
                  <div className="col-md-3 p-3" key={venue.id}>
                    <div className="card h-100 text-center p-4">
                      <img
                        src={venue.media}
                        height="250px"
                        width="100%"
                        alt={venue.title}
                        style={{ objectFit: "cover" }}
                      />

                      {editVenueId === venue.id ? (
                        <Update
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
                  </div>
                </>
              ))}
            </div>
      
        </div>
      </>
    );
  };

  return (
    <div className="container my-3 py-1">
      <div className="row">
        <div className="col-12 mb-5"></div>
      </div>
      <div className="row justify-content-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : (
          <ShowAdminVenues />
        )}
      </div>
    </div>
  );
};

export default AdminVenues;
