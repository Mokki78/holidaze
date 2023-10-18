import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Card, ListGroup } from "react-bootstrap";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    let componentMounted = true;

    const fetchVenues = async () => {
      setLoading(true);
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/venues"
      );

      if (componentMounted) {
        const venues = await response.json();
        setVenues(venues);
        setLoading(false);
      }
    };

    fetchVenues();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loader = () => {
    return <div>Loading</div>;
  };

  const letsNavigate = useNavigate();

  const ShowVenues = () => {
    return (
      <>
        <Container className="d-flex align-items-center">
          <Row >
            {venues.map((venue) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <button
                    onClick={() => letsNavigate(`/singleproduct/${venue.id}`)}
                    className="col-md-3 p-3"
                    key={venue.id}
                  >
                    <Card.Body>
                      <Card.Img
                        src={venue.media}
                        width="250px"
                        alt={venue.title}
                      />

                      <ListGroup>
                        <ListGroup.Item>
                         <strong>{venue.location.city + ", " + venue.location.country}{" "}</strong> 
                        </ListGroup.Item>
                        <ListGroup.Item>NOK {venue.price} ,-</ListGroup.Item>
                        <ListGroup.Item>
                          {venue.rating && venue.rating}
                          <i className="fa fa-star"></i>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </button>
                </Card>
              );
            })}
          </Row>
        </Container>
      </>
    );
  };

  return (
    <div className="container my-3 py-1">
      <div className="row">
        <div className="col-12 mb-5">
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loader /> : <ShowVenues />}
      </div>
    </div>
  );
};

export default Home;
