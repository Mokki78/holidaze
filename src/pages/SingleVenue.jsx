import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Reserve } from "../components/Reserve";
import { Loader } from "../components/Spinner"



export function SingleVenue( disabledDateRanges) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [ guests, setGuests ] = useState(1);
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
      navigate("/login");
    }
  };

  if (isError) {
    return <div>Error</div>;
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
        <Row>
          
       
          <Col className="col-10-md d-flex flex-column align-items-center pt-5 pb-md-5 mt-5 mx-5">
          <h1 className="title">{data.name}</h1>
            <img
              src={data.media}
              className="img-fluid"
              alt={data.name}
              maxWidth="150px"
              style={{ minWidth: "150px" }}
            />
          </Col>
          <Col className="col-10-md d-flex flex-column align-items-center pt-5 pb-md-5 bg-white">
           
            <p>{data.location.city + ", " + data.location.country} </p>

            <p className="p-5 bg-light">{data.description}</p>
            <div className="col-6">
              <p>Max guests: {data.maxGuests}</p>
              <p>Parking: {data.meta.parking ? "yes" : "no"}</p>
              <p>Wifi: {data.meta.wifi ? "yes" : "no"}</p>
              </div>
              <div className="col-6">
              <p>Breakfast: {data.meta.breakfast ? "yes" : "no"}</p>
              <p>Pets allowed: {data.meta.pets ? "yes" : "no"}</p>
          
            <strong className="bg-light p-2 mb-3 m-2">
              Price per night {data.price},-
            </strong>
            </div>

            <div>
              <button className="mainButton"onClick={handleClick}>Check availability</button>
            </div>
          </Col>
         
          
         
        </Row>
        {openModal && <Reserve setOpen={setOpenModal} venueId={id}  guests={guests} setGuests={setGuests} disabledDateRanges={disabledDateRanges}/>}
      </Container>
      )}
    </>
  );
}

export default SingleVenue;
