import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Loader } from "../components/Spinner";

export function ProfileBookings({ name }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Error fetching bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [name]);

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  return (
    <Container className="pt-5">
      <h2 className="subTitle">Your bookings:</h2>
      <Row sm={1} md={3} lg={4}>
       
          {bookings.map((booking) => (
            <Col className="col-12 col-sm-6 col-md-3 p-3" key={booking.id}>
              <div className="card h-100 p-2 m-2 d-flex align-items-center">
                <div>
                  <img
                    src={booking.venue.media[0]}
                    alt={booking.venue.name}
                    
                    width="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-2 m-2 align-items-center">
                  <h1
                    className="subTitle
              "
                  >
                    {booking.venue.name}
                  </h1>
                  <p>
                    Address for property: {booking.venue.location.address + ", " +
                    booking.venue.location.city.toUpperCase() +
                      ", " +
                      booking.venue.location.country.toUpperCase()}
                  </p>
                  Booked for {booking.guests} {booking.guests <= 1 ? 'person' : 'people'}
                  <p>Price per night: {booking.venue.price},-</p>

                  <p>
                    Booking dates: from{" "}
                    {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Col>
          ))}
       
      </Row>
    </Container>
  );
}
