import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";


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
      <div className="d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );
  }



  return (
    <Container className="venues d-flex justify-content-center align-items-center">
      <h2>Your bookings:</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <div>
              <h5>{booking.venue.name}</h5>
              <p>{booking.venue.description}</p>
              <p>Price: {booking.venue.price}</p>
              <img src={booking.venue.media[0]} alt={booking.venue.name} width={"200px"}/>
              <p>
               Booking dates:  {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
