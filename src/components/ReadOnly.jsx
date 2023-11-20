import React from "react";

export const ReadOnly = ({venue, handleEditClick, handleDelete}) => {

    const getYesNoValue = (value) => (value ?  'Yes' : 'No');

  return (
    <>
      <div>
        <div>
          <h2>{venue.name} </h2>
          <p>Description: {venue.description}</p>
          <p>NOK {venue.price} ,- per night</p>
          <p>Rating: {venue.rating && venue.rating}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Wifi: {getYesNoValue(venue.meta.parking)}</p>
          <p>Parking: {getYesNoValue(venue.meta.parking)}</p>
          <p>Breakfast: {getYesNoValue(venue.meta.breakfast)}</p>
          <p>Pets allowed: {getYesNoValue(venue.meta.pets)}</p>
          <p>Address: {venue.location.address}</p>
          <p>City: {venue.location.city}</p>
          <p>Zip: {venue.location.zip}</p>
          <p>Country: {venue.location.country}</p>
          <p>Continent: {venue.location.continent}</p>
        </div>
        <button type="button" onClick={(event) => handleEditClick(event, venue)}>Edit</button>
       <button type="button" onClick={(event) => handleDelete(venue.id, event)}>Delete</button>
      </div>
    </>
  );
};


export default ReadOnly;
