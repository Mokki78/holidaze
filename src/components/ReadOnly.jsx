import React from "react";

export const ReadOnly = ({ venue, handleEditClick, handleDelete }) => {
  const getYesNoValue = (value) => (value ? "Yes" : "No");

  return (
    <>
      <container>
        <div className="d-flex flex-row">
          <div className="flex-column">
            <h2>{venue.name} </h2>
            <p>Description: {venue.description}</p>
            <p>NOK {venue.price} ,- per night</p>
            <p>Rating: {venue.rating && venue.rating}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <br></br>
            <p>Wifi: {getYesNoValue(venue.meta.parking)}</p>
            <p>Parking: {getYesNoValue(venue.meta.parking)}</p>
            <p>Breakfast: {getYesNoValue(venue.meta.breakfast)}</p>
            <p>Pets allowed: {getYesNoValue(venue.meta.pets)}</p>
            <br></br>
            <p>Address: {venue.location.address}</p>
            <p>City: {venue.location.city}</p>
            <p>Zip: {venue.location.zip}</p>
            <p>Country: {venue.location.country}</p>
            <p>Continent: {venue.location.continent}</p>
          </div>
        </div>

        <button
          type="button"
          className="mainButton "
          onClick={(event) => handleEditClick(event, venue)}
        >
          Edit
        </button>
        <button
          type="button"
          className="mainButton "
          onClick={(event) => handleDelete(venue.id, event)}
        >
          Delete
        </button>
      </container>
    </>
  );
};

export default ReadOnly;
