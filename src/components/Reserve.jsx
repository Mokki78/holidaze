import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Booking } from "../components/Booking";
import { SearchContext } from "../context/SearchContext";
import { Container} from "react-bootstrap";

export const Reserve = ({ setOpen, venueId, disabledDateRanges }) => {
  const { dates } = useContext(SearchContext);
  const [guests, setGuests] = useState(1);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const onDisabledDateRangesChange = (ranges) => {
    // Do something with the disabled date ranges, if needed
    console.log("Disabled Date Ranges changed:", ranges);
  };

  const [maxGuests, setMaxGuests] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  async function fetchMaxGuests(venueId) {
    try {
      if (!token) {
        console.error("Access token not found");
        return null;
      }

      const url = `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.maxGuests;
      } else {
        console.error("There was an error fetching data");
      }
    } catch (error) {
      console.error("There was an error fetching maxGuests", error);
    }

    return null;
  }

  useEffect(() => {
    fetchMaxGuests(venueId)
      .then((maxGuests) => {
        setMaxGuests(maxGuests);
        console.log("My Max Guests:", maxGuests);
      })
      .catch((error) => {
        console.error("Error while fetching maxGuests:", error);
      });
  }, [venueId]);
  console.log("My venue id: ", venueId);
  console.log("MyMaxGuests:", maxGuests);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange([dateRange.selection]);
  };

  const handleClick = () => {
    if (maxGuests === 0) {
      alert("Max guests information not available.");
    } else {
      const startDate = selectedDateRange[0].startDate;
      const endDate = selectedDateRange[0].endDate;
      const bookingGuests = guests;

      if (bookingGuests <= maxGuests) {
        const bookingData = {
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: guests,
          venueId: venueId,
        };
        console.log(bookingData);

        fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        })
          .then((response) => {
            if (response.ok) {
              alert("Booking successful!");
            } else {
              alert("Number of booked guests exceeds the maximum limit.");
            }
          })
          .catch((error) => {
            console.error("Error while booking:", error);
          });
      }
    }
  };

  return (
    <>
      <Container className="reserve">
        <Booking
          selectedDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
          guests={guests}
          setGuests={setGuests}
          venueId={venueId}
          disabledDateRanges={disabledDateRanges}
          onDisabledDateRangesChange={onDisabledDateRangesChange}
        />
          <button className="mainButton" onClick={handleClick}>
              Book now
            </button>
          

        <div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
        
           
          
        </div>
      </Container>
    </>
  );
};

export default Reserve;
