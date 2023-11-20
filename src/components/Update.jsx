import React from "react";


export const Update = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  return (
    <form onSubmit={handleEditFormSubmit}>
      <>
      
        <div>
          <div>
            <h2>
              <input
                type="text"
                required="required"
                placeholder="Enter a new name for the property"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
              ></input>{" "}
            </h2>
            <p>
              <input
                type="text"
                required="required"
                placeholder="Update the description of the property"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="url"
                required="required"
                placeholder="Update the images for the property with valid URL"
                name="url"
                value={editFormData.media}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="price"
                placeholder="Update the price"
                value={editFormData.price}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="maxGuests"
                placeholder="Update the max number of guests"
                value={editFormData.maxGuests}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                name="rating"
                placeholder="How is the property rated? Number from 1 - 5."
                value={editFormData.rating}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="checkbox"
                name="wifi"
                placeholder="Are there wifi?"
                checked={editFormData.wifi}
                onChange={handleEditFormChange}
              ></input>{" "}
              Are there wifi?
            </p>
            <p>
              <input
                type="checkbox"
                
                name="breakfast"
                placeholder="Does the stay include breakfast"
                checked={editFormData.breakfast}
                onChange={handleEditFormChange}
              ></input>{" "}
              Does it include breakfast??
            </p>
            <p>
              <input
                type="checkbox"
                name="parking"
                placeholder="Is there parking?"
                checked={editFormData.parking}
                onChange={handleEditFormChange}
              ></input>{" "}
              Are there parking
            </p>
            <p>
              <input
                type="checkbox"
                name="pets"
                placeholder="Are pets allowed?"
                checked={editFormData.pets}
                onChange={handleEditFormChange}
              ></input>{" "}
              Are pets allowed?
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="address"
                placeholder="Update the adress for the property"
                value={editFormData.address}
                onChange={handleEditFormChange}
              ></input>
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="city"
                placeholder="Update the city"
                value={editFormData.city}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="zip"
                placeholder="Update the description of the zip"
                value={editFormData.zip}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                required="required"
                name="country"
                placeholder="Update the description of the country"
                value={editFormData.country}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
            <p>
              <input
                type="text"
                name="continent"
                placeholder="Update the continent"
                value={editFormData.continent}
                onChange={handleEditFormChange}
              ></input>{" "}
            </p>
          </div>
          <button type="submit">Save</button>
        </div>
    
      </>
      
    </form>
  );
};
