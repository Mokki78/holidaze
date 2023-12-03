import React, { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const Update = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openLocalModal, setOpenLocalModal] = useState(true);

  console.log("My Modal", setOpenLocalModal);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setOpenLocalModal(false);
    navigate("/admin");
  };

  return (
    <Container>
      <Row>
        <Col className=" card">
          <div className="card-body">
            <form onSubmit={(e) => handleEditFormSubmit(e)}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="rClose"
                onClick={(e) => {
                  e.preventDefault();

                  handleClick(e);
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
                  value={editFormData.name}
                  onChange={handleEditFormChange}
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
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                />
                {validationErrors.description !== undefined && (
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.description[0]}
                    </small>
                  </div>
                )}
              </div>
              <div className="">
                <label htmlFor="images" className="form-label">
                  Images of the property:
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  name="url"
                  value={editFormData.media}
                  onChange={handleEditFormChange}
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
                  value={editFormData.price}
                  onChange={handleEditFormChange}
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
                  value={editFormData.maxGuests}
                  onChange={handleEditFormChange}
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
                  checked={editFormData.wifi}
                  onChange={handleEditFormChange}
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
                  checked={editFormData.breakfast}
                  onChange={handleEditFormChange}
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
                  checked={editFormData.parking}
                  onChange={handleEditFormChange}
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
                  checked={editFormData.breakfast}
                  onChange={handleEditFormChange}
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
                  checked={editFormData.pets}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Address:"
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditFormChange}
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
                  value={editFormData.city}
                  onChange={handleEditFormChange}
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
                  value={editFormData.country}
                  onChange={handleEditFormChange}
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
                  onClick={() => setOpenLocalModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Update;
