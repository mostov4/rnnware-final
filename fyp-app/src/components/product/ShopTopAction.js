import PropTypes from "prop-types";
import React from "react";
import { setActiveLayout } from "../../helpers/product";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
  getSortParams,
  getSortParamsCountry
}) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Filter by price</option>
            <option value="priceHighToLow">High to Low</option>
            <option value="priceLowToHigh">Low to High</option>
          </select>
        </div>

        <div className="shop-select">
          <select
            onChange={e => {
              // getSortParams("country", e.target.value)
              getSortParamsCountry(e.target.value)
            }}
            
          >
            <option value="">All Countries</option>
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

      <div className="shop-tab">
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getSortParams: PropTypes.func,
  getSortParamsCountry:PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;
