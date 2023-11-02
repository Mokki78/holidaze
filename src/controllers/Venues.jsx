import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Venues() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  let { id: venueId } = useParams();

  console.log(userDetails);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function getVenues(url) {
      try {
        setLoading(true);
        setIsError(false);

        const response = await fetch(url, options);
        const json = await response.json();

        setData(json);
        console.log(json);
      } catch (error) {
        console.error(
          "There has been an error fetching the requested venue details"
        );
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    getVenues(`https://api.noroff.dev/api/v1/holidaze/bookings`, options);
  }, [venueId]);

  if (isError) {
    return <div>Error</div>;
  }

  return null;
}

export default Venues;
