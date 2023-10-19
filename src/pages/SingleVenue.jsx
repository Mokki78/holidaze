import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export function SingleVenue() {

  const [data, setData] = useState([]);
  const[loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let { id } = useParams();


  useEffect(() => {
    async function getVenues(url) {
      try {
        setLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch(error ) {
      console.error("There has been an error fetching the requested venue details")
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
        <div className="d-flex justify-content-center align-items-center">
          Loading...
        </div>
        ;
      </>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }


    return (
    <>
    <Container style={{ border: "0.5px solid #E3E3E3" }} className="mt-5 mb-5">
      <Row>
       
        <Col className="col-10-md d-flex flex-column align-items-center  pt-5 pb-md-5">
            <img
              src={data.media}
              className="img-fluid"
              alt={data.name}
              maxWidth="150px"
              style={{ minWidth: "150px" }}
            />
          </Col>
          <Col className="col-10-md d-flex flex-column align-items-center pt-5 pb-md-5 bg-white">
          <h1>{data.name}</h1>
        <p>{data.location.city + ", " + data.location.country}{" "}</p>
     
          
          <p className="p-5  bg-light">{data.description}</p>
            <strong className="bg-light p-2">Price per night {data.price} ,-</strong>
            <h5 className="pt-5" style={{ color: "#428DA8"}}>Check availability:</h5>
            <div>
              
            </div>
           
            </Col>
           
      </Row>

    </Container>
    </>
    );
  }
  
 export default SingleVenue; 
