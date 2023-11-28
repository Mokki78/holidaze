import React, { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../components/Layout";

export function AdminCreate({ setOpenModal}) {

 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [data, setData] = useState({});


  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createVenueAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: name,
      description: description,
      media: media,
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests),
      rating: parseFloat(rating),
      meta: {
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
      location: {
        address: address,
        city: city,
        zip: zip,
        country: country,
        continent: continent,
      },
    };

    const apiUrl = "https://api.noroff.dev/api/v1/holidaze/venues";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitting(false);
        setData(data);

        alert("You have successfully made a new venue");
      } else {
        setIsSubmitting(false);

        const errorData = await response.json();
        if (errorData.errors !== undefined) {
          setValidationErrors(errorData.errors);
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("An error occurred:", error);
    }
  };




  return (
    <>
      <Layout>
        <div className="row justify-content-md-center mt-5">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Create Venue</h5>
                <form onSubmit={(e) => createVenueAction(e)}>
                <FontAwesomeIcon
  icon={faCircleXmark}
  className="rClose"
  onClick={(e) => {
    e.preventDefault(); // Prevent form submission
    setOpenModal(false);
  }}
/>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Title:
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {validationErrors.name !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.name[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Make a detailed description of the property:
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {validationErrors.description !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.description[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                      Images of the property:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="url"
                      name="url"
                      value={media}
                      onChange={(e) => setMedia(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price per night:
                    </label>
                    <input
                      required
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {validationErrors.price !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.price[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="maxGuests" className="form-label">
                      Max number of guests:
                    </label>
                    <input
                      required
                      type="number"
                      className="form-control"
                      id="guests"
                      name="guests"
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(e.target.value)}
                    />
                    {validationErrors.maxGuests !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.maxGuests[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                      Rating: ( max rating is 5)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="rating"
                      name="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    {validationErrors.rating !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.rating[0]}
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="wifi" className="form-label">
                      Wifi
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="wifi"
                      name="wifi"
                      checked={wifi}
                      onChange={(e) => setWifi(e.target.checked)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="parking" className="form-label">
                      Parking
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="parking"
                      name="parking"
                      checked={parking}
                      onChange={(e) => setParking(e.target.checked)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="breakfast" className="form-label">
                      Breakfast
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="breakfast"
                      name="breakfast"
                      checked={breakfast}
                      onChange={(e) => setBreakfast(e.target.checked)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pets" className="form-label">
                      Pets
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="pets"
                      name="pets"
                      checked={pets}
                      onChange={(e) => setPets(e.target.checked)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {validationErrors.adress !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.address[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {validationErrors.city !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.city[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zip" className="form-label">
                      Zip:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                    {validationErrors.zip !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.zip[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    {validationErrors.country !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.country[0]}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="continent" className="form-label">
                      Continent:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="continent"
                      name="continent"
                      value={continent}
                      onChange={(e) => setContinent(e.target.value)}
                    />
                    {validationErrors.continent !== undefined && (
                      <div className="flex flex-col">
                        <small className="text-danger">
                          {validationErrors.continent[0]}
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mainButton"
                    >
                      Create
                    </button>
                   <button type="button" className="mainButton" onClick={() => setOpenModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminCreate;
