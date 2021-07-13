import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      <div className="product-fixed-image">
        {product.image ? (
          <img
            src={product.image[0]}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
