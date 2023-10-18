import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import * as ButtonStyle from "../styled.components/Button.style";


export const Test = () => {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let componentMounted = true; 

    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
      
      if (componentMounted) {
        const products = await response.json();
        setFilteredProducts(products);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <div className="d-flex justify-content-center align-items-center">
       <p>Loading</p>
      </div>
    );
  };

  const letsNavigate = useNavigate();

  const ShowProducts = () => {
    return (
      <>
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            {filteredProducts.map((product) => {
              return (
                <ButtonStyle.Button
                  onClick={() => letsNavigate(`/singleproduct/${product.id}`)}
                  className="col-md-3 p-3"
                  key={product.id}
                >
                  <div className="card h-100 text-center p-4">
                    <img
                      src={product.media}
                      height="250px"
                      alt={product.title}
                    />
                    <div>
                      <h5>{product.location.country}</h5>
                      <p>
                     Rating: {product.rating && product.rating}
                      <i className="fa fa-star"></i>
                    </p>
                      
                      <p>
                        {product.discountedPrice < product.price ? (
                          <>
                            <span>Original price NOK {product.price}</span>
                            <br />
                            <span>NOW ONLY {product.discountedPrice},-</span>
                            <br />
                            <br />
                            <span className="discount-percent bg-danger">
                              {Math.round(
                                ((product.price - product.discountedPrice) /
                                  product.price) *
                                100
                              )}
                              % off
                            </span>
                          </>
                        ) : (
                          <span className="regular-price">
                            NOK {product.price},-
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </ButtonStyle.Button>
              );
            })}
          </Row>
        </Container>
      </>
    );
  };

  return (
    <div className="container my-3 py-1">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Test;