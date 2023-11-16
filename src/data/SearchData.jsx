import React, { useState, useEffect } from "react";

export const SearchData = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setIsLoading(false);

          console.log("My data:", data);
        } else {
          setIsError(true);
          alert("There was an error fetching the data");
        }
      } catch (error) {
        console.error("There was an error fetching the data");
        setIsError(true);
      } finally {
        setIsError(false);
      }
    };
    getSearchData();
  }, []);

  return 
};

export default SearchData;
