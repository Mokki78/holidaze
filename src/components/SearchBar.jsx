import {
  faCalendarDays,
  faMagnifyingGlass,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const SearchBar = () => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
      setOption((prev) => {
          return {
          ...prev,
           [name] : operation === "i" ? option[name] + 1 : option[name] - 1,
  };
});
  };

  return (
    <Container className="headerSearch">
      <div className="headerSearchItem">
        <span className="headerSearchText">Where is your next venue?</span>
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
        <span
          onClick={() => setOpenDate(!openDate)}
          className="headerSearchText"
        >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
          date[0].endDate,
          "dd/MM/yyyy"
        )}`}</span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRngeOnFirstSelection={false}
            ranges={date}
            className="date"
          />
        )}
      </div>
      <div className="headerSearchItem">
        <FontAwesomeIcon className="headerIcon" icon={faPerson} />
        <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${option.adult} adult · ${option.children} children · ${option.room} room`}</span>
       {openOptions && <div className="options">
          <div className="optionItem">
            <span className="optionText">Adult</span>
            <div className="optionCounter">
            <button 
            disabled={option.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult","d" )}>-</button>
            <span className="optionCounterNumber">{option.adult}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("adult","i" )}>+</button>
          </div>
          </div>
       
          <div className="optionItem">
            <span className="optionText">Children</span>
            <div className="optionCounter">
            <button  disabled={option.children <= 0}   className="optionCounterButton" onClick={()=>handleOption("children","d" )}>-</button>
            <span className="optionCounterNumber">{option.children}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("children","i" )}>+</button>
          </div>
          </div>
        
          <div className="optionItem">
            <span className="optionText">Room</span>
            <div className="optionCounter">
            <button  disabled={option.room <= 1}   className="optionCounterButton" onClick={()=>handleOption("room","d" )}>-</button>
            <span className="optionCounterNumber">{option.room}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("room","i" )}>+</button>
          </div>
          </div>
        </div>}
        <div>
          <button>
            <FontAwesomeIcon className="headerIcon" icon={faMagnifyingGlass} />
            Search
          </button>
        </div>
      </div>
    </Container>
  );
};
