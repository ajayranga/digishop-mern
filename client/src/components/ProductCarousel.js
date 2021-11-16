import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProduct } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

const CarouselCarousel = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productTopList
  );
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    if (!products || products.length === 0) dispatch(fetchTopProduct());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      activeIndex={index}
      pause="hover"
      className="bg-dark"
      onSelect={handleSelect}
      variant="dark"
    >
      {products.length !== 0 &&
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image fluid src={product.image} alt={product.name} />
              <Carousel.Caption>
                <h2>
                  {product.name} (rs{product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CarouselCarousel;
