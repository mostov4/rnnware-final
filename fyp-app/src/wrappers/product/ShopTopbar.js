import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
  getSortParams,
  getSortParamsCountry
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getLayout={getLayout}
        getFilterSortParams={getFilterSortParams}
        productCount={productCount}
        sortedProductCount={sortedProductCount}
        getSortParams={getSortParams}
        getSortParamsCountry={getSortParamsCountry}
      />
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  getSortParams:PropTypes.func,
  getSortParamsCountry:PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopbar;
