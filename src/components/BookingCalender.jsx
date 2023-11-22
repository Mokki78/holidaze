import { useState, useEffect, useMemo } from "react";
import { Booking} from "../components/Booking";

export const BookingCalender = ({ venueId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_bookings=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
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
  }, [venueId, setBookedDates]);

  // Create an array of disabled date ranges
  const disabledDateRanges = useMemo(() => {
    return bookedDates
      ? bookedDates.map((booking) => ({
          startDate: new Date(booking.dateFrom),
          endDate: new Date(booking.dateTo),
        }))
      : [];
  }, [bookedDates]);

  console.log("My disabled ranges:", disabledDateRanges);

  return null;
};


export default BookingCalender;
