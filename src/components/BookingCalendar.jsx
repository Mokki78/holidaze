import React, { useState, useEffect, useMemo } from "react";
import { Loader } from "./Spinner";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export const BookingCalendar = ({ venueId, onBookNow }) => {
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
        startDate: new Date(0),
        endDate: new Date(),
      },
    ];

    const bookedDateRanges = bookedDates
      ? bookedDates.map((booking) => ({
          startDate: new Date(booking.dateFrom),
          endDate: new Date(booking.dateTo),
        }))
      : [];

    return pastDates.concat(bookedDateRanges);
  }, [bookedDates]);

  console.log("My dates:", disabledDateRanges);

  useEffect(() => {
    // Notify the parent component about the updated disabled date ranges
    // onDisabledDateRangesChange(disabledDateRanges);
  }, [disabledDateRanges]);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange(ranges);
    // onDateRangeChange(ranges);
  };
 const isDateDisabled = (date) => {
  return (
    disabledDateRanges &&
    disabledDateRanges.some((range) => {
      const startDate = range.startDate ? new Date(range.startDate) : null;
      const endDate = range.endDate ? new Date(range.endDate) : null;

      return startDate && endDate && date >= startDate && date <= endDate;
    })
  );
};

  
   const [guests, setGuests] = useState(1);
  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({ guests: 1 });

  const handleOption = (name, operation) => {
    if (operation === "i" && option[name]) {
      setOption((prev) => ({
        ...prev,
        [name]: prev[name] + 1,
      }));
      setGuests((prevGuests) => prevGuests + 1);
    } else if (operation === "d" && option[name] > 1) {
      setOption((prev) => ({
        ...prev,
        [name]: prev[name] - 1,
      }));
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  const handleBookNow = () => {
    // Handle the booking logic here
    console.log("Booking logic goes here");
    // onBookNow(); // Uncomment this if you want to call a function from the parent
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error loading dates.</p>}
      <Container className="booking">
        <div className="bookingItem">
          <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
          <span
            className="headerSearchText"
          >{`${format(selectedDateRange[0].startDate, "dd/MM/yyyy")} to ${format(
            selectedDateRange[0].endDate,
            "dd/MM/yyyy"
          )}`}</span>

          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={true}
            ranges={selectedDateRange}
            className="BookingDate"
            disabled={isDateDisabled}
          />
        </div>
        <div className="bookingItem">
          <FontAwesomeIcon className="bookingIcon" icon={faPerson} />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="bookingText"
          >{`${guests} guests`}</span>
          <div className="options">
            <div className="bookingItem">
              <span className="bookingText">Guests</span>
              <div className="bookingCounter">
                <button
                  disabled={guests <= 1}
                  className="bookingCounterButton"
                  onClick={() => handleOption("guests", "d")}
                >
                  -
                </button>
                <span className="bookingCounterNumber">{guests}</span>
                <button
                  className="bookingCounterButton"
                  onClick={() => handleOption("guests", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        
        
      </Container>
    </div>
  );
};

export default BookingCalendar;
