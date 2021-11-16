import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pageNumber,
  totalPages,
  keyword = "",
  isAdmin = false,
}) => {
  return (
    <>
      {totalPages > 1 ? (
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {[...Array(totalPages).keys()].map((key) => (
            <LinkContainer
              to={
                isAdmin
                  ? `/admin/productList/${key + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${key + 1}`
                  : `/page/${key + 1}`
              }
            >
              <Pagination.Item key={key + 1} active={key + 1 === pageNumber}>
                {key + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      ) : (
        <></>
      )}
    </>
  );
};

export default Paginate;
