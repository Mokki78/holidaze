/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row} from "react-bootstrap";


export function AdminCreate({ setOpenModal, onVenueCreated }) {
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
  
  const [country, setCountry] = useState("");
 
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
       
        country: country,
       
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
        setOpenModal(false);
        onVenueCreated()
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
  
        <Container className="modalOverlay">
          <Row className="col-5">
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => createVenueAction(e)}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(false);
                    }}
                  />
                  <div className="mb-3">
                    <input
                      placeholder="Title:"
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
                    <input
                      placeholder="Make a detailed description of the property:"
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
                      placeholder="Price per night:"
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
                      placeholder="Max number of guests:"
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
                      placeholder="  Rating: ( max rating is 5)"
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
                    <input
                      placeholder="Address:"
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
                    <input
                      placeholder="City:"
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
                    <input
                      placeholder="Country:"
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

                  <div className="d-grid gap-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mainButton"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mainButton"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Row>
        </Container>
    
    </>
  );
}

export default AdminCreate;
