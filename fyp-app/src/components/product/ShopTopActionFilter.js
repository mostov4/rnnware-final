import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopTopFilter from "./ShopTopFilter";
import { toggleShopTopFilter } from "../../helpers/product";

const ShopTopActionFilter = ({
  getFilterSortParams,
  productCount,
  sortedProductCount,
  products,
  getSortParams
}) => {
  return (
    <Fragment>
      <div className="shop-top-bar mb-35">
        <div className="select-shoing-wrap">
          <div className="shop-select">
            <select
              onChange={e => getFilterSortParams("filterSort", e.target.value)}
            >
              <option value="Filter by Price">Default</option>
              <option value="priceHighToLow">High to Low</option>
              <option value="priceLowToHigh">Low to High</option>
            </select>
          </div>
          <div className="shop-select">
          <select
            onChange={e => getSortParams("countryFilterSort", e.target.value)}
          >
            <option value="Filter by Country">Filter by Country</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Austria">Austria</option>
            <option value="Germany">Germany</option>
          </select>
        </div>
          <p>
            Showing {sortedProductCount} of {productCount} result
          </p>
        </div>

        <div className="filter-active">
          <button onClick={e => toggleShopTopFilter(e)}>
            <i className="fa fa-plus"></i> filter
          </button>
        </div>
      </div>

      {/* shop top filter */}
      <ShopTopFilter products={products} getSortParams={getSortParams} />

    </Fragment>
  );
};

ShopTopActionFilter.propTypes = {
  getFilterSortParams: PropTypes.func,
  getSortParams: PropTypes.func,
  productCount: PropTypes.number,
  products: PropTypes.array,
  sortedProductCount: PropTypes.number
};

export default ShopTopActionFilter;
