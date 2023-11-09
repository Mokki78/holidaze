import React, { useState, useEffect } from "react";
import { AdminDelete } from "../components/AdminDelete";

export const AdminVenues = ({ name }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
  }, [name]); // Include 'name' in the dependency array

const handleClick = (venueId) => {

  const ifDelete = window.confirm("Are you really sure you want to delete this?")

  if(ifDelete) {
    const requestOptions = {
      method: "DELETE",
    };

    fetch (`https://api.noroff.dev/api/v1/holidaze/venues/`+ venueId, requestOptions).then((response) => {
      return response.json();
    }).then(()  => {
  
    });

   

  
  const ShowAdminVenues = () => {
    return (
      <>
        <h1>Your venues:</h1>
        <div className="venues d-flex justify-content-center align-items-center">
          <div className="row">
            {data.map((venue) => (
              <div className="col-md-3 p-3" key={venue.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={venue.media}
                    height="250px"
                    width="100%"
                    alt={venue.title}
                    style={{ objectFit: "cover" }}
                  />

                  <div>
                  <h2> {venue.name} </h2>
                  <p>Description: {venue.description}</p>
                    <p>NOK {venue.price} ,- per night</p>
                    <p>Rating: {venue.rating && venue.rating}</p>
                    <p>Max Guests: {venue.maxGuests}</p>
                    <p>Wifi: {venue.meta.wifi}</p>
                    <p>Parking: {venue.meta.parking}</p>
                    <p>Breakfast: {venue.meta.breakfast}</p>
                    <p>Pets allowed: {venue.meta.pets}</p>
                    <p>City: {venue.location.city}</p>
                    <p>Address: {venue.location.address}</p>
                    <p>Zip: {venue.location.zip}</p>
                    <p>Country: {venue.location.country}</p>
                    <p>Continent: {venue.location.continent}</p>
                  </div>
                  <div>
            <button onClick={() => handleClick(venueId)}>Edit</button>
            <button>Delete</button>
          </div>
                </div>
              </div>
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
        {isLoading ? <p>Loading...</p> : isError ? <p>Error fetching data</p> : <ShowAdminVenues />}
      </div>
    </div>
  );
};
}
}

export default AdminVenues;
