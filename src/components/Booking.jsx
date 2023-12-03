import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const Booking = ({
  selectedDateRange,
  onDateRangeChange,
  guests,
 setGuests,
  onDisabledDateRangesChange,
}) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({ guests: 1 });

  const handleOption = (name, operation) => {
    if (operation === "i" && option[name]) {
      setOption((prev) => ({ ...prev, [name]: prev[name] + 1 }));
      setGuests((prevGuests) => prevGuests + 1);
    } else if (operation === "d" && option[name] > 1) {
      setOption((prev) => ({ ...prev, [name]: prev[name] - 1 }));
      setGuests((prevGuests) => prevGuests - 1);
    }
  };

  return (
    <Container className="booking">
      <div className="bookingDateContainer">
        <div className="bookingItem">
          <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
          <span onClick={() => setOpenDate(!openDate)}>
            {`${format(
              selectedDateRange[0].startDate,
              "dd/MM/yyyy"
            )} to ${format(selectedDateRange[0].endDate, "dd/MM/yyyy")}`}
          </span>
          <DateRange
            editableDateInputs={true}
            onChange={onDateRangeChange}
            moveRangeOnFirstSelection={true}
            ranges={selectedDateRange}
            disabledDate={(date) => onDisabledDateRangesChange(date)}
            className={`BookingDate ${openDate ? "open" : ""}`}
          />
        </div>
      </div>
      <div className="bookingOptionsContainer">
        <div className="bookingItem">
          <FontAwesomeIcon className="bookingIcon" icon={faPerson} />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="bookingText"
          >{`${guests} guests`}</span>
          <div className={`options ${openOptions ? "open" : ""}`}>
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
      </div>
    </Container>
  );
};

export default Booking;
