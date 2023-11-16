import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";

export const BookingCalender = ({ venueId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


 useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings/?_venue=true&venueId`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );


       if (response.ok ) {

          const data = await response.json();
          setBookedDates(data.bookings);

          console.log("Bookings:", data);
        } else {
          console.error("Error fetching bookings");
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDates();
  }, [venueId]);

  // Create an array of disabled date ranges

  const disabledDateRanges = bookedDates
    ? bookedDates
        .filter((bookings) => {
          return bookings.venue.id === venueId;
        })
        .map((bookings) => ({
          startDate: new Date(bookings.dateFrom),
          endDate: new Date(bookings.dateTo),
        }))
    : [];

  console.log("My disabled ranges:", disabledDateRanges);

  return <DateRange disabledDateIntervals={disabledDateRanges} />;
};

export default BookingCalender;
