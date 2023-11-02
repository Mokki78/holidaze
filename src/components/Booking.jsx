import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const Booking = ({ selectedDateRange, onDateRangeChange }) => {
  const [openDate, setOpenDate] = useState(false);
  const [ guests, setGuests] = useState(1);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({
    guests: 1,
  });

  const handleOption = (name, operation) => {
    if (operation === "i" && option[name] ) {
      setOption((prev) => ({
        ...prev,
        [name]: prev[name] + 1,
      }));
      setGuests(option[name] + 1); // Update the guests state
    } else if (operation === "d" && option[name] > 1) {
      setOption((prev) => ({
        ...prev,
        [name]: prev[name] - 1,
      }));
      setGuests(option[name] - 1); // Update the guests state
    }
  };
  

  return (
    <Container className="booking">
      <div className="bookingItem">
        <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
        <span
          onClick={() => setOpenDate(!openDate)}
          className="headerSearchText"
        >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
          date[0].endDate,
          "dd/MM/yyyy"
        )}`}</span>

        <DateRange
          editableDateInputs={true}
          onChange={onDateRangeChange}
          moveRngeOnFirstSelection={false}
          ranges={selectedDateRange}
          className="BookingDate"
        />
      </div>
      <div className="bookingItem">
        <FontAwesomeIcon className="bookingIcon" icon={faPerson} />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="bookingText"
        >{`${option.guests} guests`}</span>
        <div className="options">
          <div className="bookingItem">
            <span className="bookingText">Guests</span>
            <div className="bookingCounter">
              <button
                disabled={option.guests <= 1}
                className="bookingCounterButton"
                onClick={() => handleOption("guests", "d")}
              >
                -
              </button>
              <span className="bookingCounterNumber">{option.guests}</span>
              <button
                className="bookingCounterButton"
                onClick={() => handleOption("guests", "i")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </Container>
  );
};

export default Booking;
