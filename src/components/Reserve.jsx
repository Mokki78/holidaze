import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Booking } from "../components/Booking";
import { SearchContext } from "../context/SearchContext";

export const Reserve = ({ setOpen, singleVenueId }) => {
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate);
    const date = new Date(start.getTime())

    let list = [];

    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return list
  };



  const handleClick = () => {};

  return (
    <div className="reserve">
      <div>
        <h5>Reserve</h5>
      </div>
      <Booking />
      <div>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <button onClick={handleClick}>Book now</button>
      </div>
    </div>
  );
};
export default Reserve;
