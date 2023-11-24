import React, { useState, useEffect, useMemo } from "react";
import { Loader } from "../components/Spinner";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const BookingCalender = ({ venueId, onDisabledDateRangesChange, onDateRangeChange}) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
    const pastDates = [
      {
        startDate : new Date(0),
        endDate : new Date(),
      }
    ];

    const bookedDateRanges = bookedDates
      ? bookedDates.map((booking) => ({
          startDate: new Date(booking.dateFrom),
          endDate: new Date(booking.dateTo),
        }))
      : [];

  return pastDates.concat(bookedDateRanges)
}, [bookedDates]);


  console.log("My dates:", disabledDateRanges)

  useEffect(() => {
    // Notify the parent component about the updated disabled date ranges
    onDisabledDateRangesChange(disabledDateRanges);
  }, [disabledDateRanges, onDisabledDateRangesChange]);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange(ranges);
    onDateRangeChange(ranges);
  };

  const isDateDisabled = (date) => {
    return disabledDateRanges.some((range) => date >= range.startDate && date <= range.endDate);
  };


  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error loading dates.</p>}
      {/* Render the DateRange component with disabledDateRanges */}
      <DateRange
        ranges={selectedDateRange}
        onChange={handleDateRangeChange}
        disabledDate={isDateDisabled}
      />
    </div>
  );
};

export default BookingCalender;
