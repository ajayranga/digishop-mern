import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({
  title = "Welcome to DigiShop",
  description = "We sell best electronics products at best prices",
  keywords = "electronics, cheap products, buy electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ajay Ranga" />
    </Helmet>
  );
};

export default Meta;
