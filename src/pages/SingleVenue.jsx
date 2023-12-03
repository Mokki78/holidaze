import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Reserve } from "../components/Reserve";
import { Loader } from "../components/Spinner";
import { Helmet } from "react-helmet";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SingleVenue(disabledDateRanges) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [guests, setGuests] = useState(1);
  let { id } = useParams();

  console.log(userDetails);

  useEffect(() => {
    async function getVenues(url) {
      try {
        setLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.error(
          "There has been an error fetching the requested venue details"
        );
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    getVenues(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  }, [id]);

  if (loading || !data.id) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const handleClick = () => {
    if (userDetails) {
      setOpenModal(true);
    } else {
      alert("You have to login to make a booking.");
      navigate("/login");
    }
  };

  if (isError) {
    return <div>There was an error collecting data.</div>;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container
          style={{ border: "0.5px solid #E3E3E3" }}
          className="mt-5 mb-5"
        >
          <Helmet>
            <title>Holidaze {data.name}</title>
            <meta name="description" content="Single venue" />
            <meta name="keywords" content="Single venue react booking app" />
          </Helmet>
          <Row>
            <div className="singleVenue d-flex flex-row">
              <Col className="col-10-md d-flex flex-column align-items-center pt-2 pb-md-5 mt-2 mx-4">
                <h1 className="title">
                  {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                </h1>
                <img
                  src={data.media}
                  className="img-fluid"
                  alt={data.name}
                  maxWidth="150px"
                  style={{ minWidth: "150px" }}
                />
              </Col>

              <Col className="col-10-md d-flex flex-column bg-white pt-5 pb-md-5">
                <div className="d-flex flex-column align-items-center">
                  <h3>
                    {data.location.city.charAt(0).toUpperCase() +
                      data.location.city.slice(1) +
                      ", " +
                      data.location.country}
                  </h3>

                  <p className="p-3 m-4 bg-light">{data.description}</p>
                </div>

                <Row className="d-flex justify-content-center">
                  <Col className="col-md-3 p-2 m-3">
                    <div>
                      <FontAwesomeIcon icon={faBed} />
                      <p>Max guests: {data.maxGuests}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCarSide} />
                      <p>Parking: {data.meta.parking ? "yes" : "no"}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faWifi} />
                      <p>Wifi: {data.meta.wifi ? "yes" : "no"}</p>
                    </div>
                  </Col>
                  <Col className="col-md-3 p-2 m-3">
                    <div>
                      <FontAwesomeIcon icon={faMugSaucer} />
                      <p>Breakfast: {data.meta.breakfast ? "yes" : "no"}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDog} />
                      <p>Pets allowed: {data.meta.pets ? "yes" : "no"}</p>
                    </div>
                    <div className="d-flex p-6">
                      <p className="pt-5">
                        <b>Price per night {data.price},-</b>
                      </p>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-auto">
                  <button className="mainButton" onClick={handleClick}>
                    Check availability
                  </button>
                </div>
              </Col>
            </div>
          </Row>

          {openModal && (
            <Reserve
              setOpen={setOpenModal}
              venueId={id}
              guests={guests}
              setGuests={setGuests}
              disabledDateRanges={disabledDateRanges}
            />
          )}
        </Container>
      )}
    </>
  );
}

export default SingleVenue;
