import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form } from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const SEARCH_URI = "https://api.noroff.dev/api/v1/holidaze/venues/";

export const Search = () => {
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState([]);

  const letsNavigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SEARCH_URI}?q=${searchQuery}`);
        if (response.ok) {
          const venues = await response.json();
          setFilteredVenues(venues);
        } else {
          console.error("Failed to fetch products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [searchQuery]);

  const Loading = () => {
    return <div>Loading...</div>;
  };

  const handleSelection = (selected) => {
    if (selected.length > 0) {
      const selectedVenue = filteredVenues.find(
        (venue) => venue.name === selected[0]
      );
      letsNavigate(`/singlevenue/${selectedVenue.id}`);
    }
  };

  const searchOptions = filteredVenues.map((venue) => venue.name);

  return (
    <div className="headerSearch">
      <div className="row">
        <div className="col-10 mb-5"></div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : (
          <Container className="d-flex align-items-center">
            <Row>
              <Form
                className="search d-flex col-12"
                onSubmit={(e) => e.preventDefault()}
              >
                <Typeahead
                  id="product-search"
                  options={searchOptions}
                  selected={selectedOption}
                  onChange={handleSelection}
                  placeholder="Search for venue"
                  className="me-2"
                  icon="prime:search"
                  height="30px"
                />
              </Form>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Search;

