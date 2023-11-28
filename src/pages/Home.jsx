import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import * as ButtonStyle from "../styled.components/Button.style";
import { Loader } from "../components/Spinner";
import { Icon } from "@iconify/react";



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

  

  const letsNavigate = useNavigate();

  const ShowVenues = () => {
    return (
      <>
        <Container className="venues d-flex justify-content-center align-items-center">
          <Row>
            {venues.map((venue) => {
              return (
                <ButtonStyle.Button
                  onClick={() => letsNavigate(`/singlevenue/${venue.id}`)}
                  className="col-md-3 p-3"
                  key={venue.id}
                >
                  <div className="card h-100 text-center p-4">
                    <img
                      src={venue.media}
                      height="250px"
                      width="100%"
                      alt={venue.title}
                      style={{ objectFit: "cover" }}
                    />

                    <div>
                      <h5 className="venueTitle">
                        <strong>
                          {venue.location.city + ", " + venue.location.country}{" "}
                        </strong>
                      </h5>
                      <p>NOK {venue.price} ,-</p>
                      <p>
                        {venue.rating && venue.rating}
                        <Icon icon="prime:star" height="30px" />
                      </p>
                    </div>
                  </div>
                </ButtonStyle.Button>
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
        <div className="col-12 mb-5"></div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loader /> : <ShowVenues />}
      </div>
    </div>
    
  );
};

export default Home;
