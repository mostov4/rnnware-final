import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import { RetailerProductForm } from "../../components/RetailerProductForm";
import { RetailerProductList } from "../../components/RetailerProductList";
import { RetailerOrderList } from "../../components/RetailerOrderList";
import { useDispatch } from "react-redux";
import { EMPTY_PRODUCTS } from "../../redux/actions/editDelete";

const RetailerPList = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch({ type: EMPTY_PRODUCTS })
    return () => {
      dispatch({ type: EMPTY_PRODUCTS })
    }
  }, [dispatch])
  return (
    <Fragment>
      <MetaTags>
        <title>RNN-Ware | Retailer Product List</title>

      </MetaTags>

      <LayoutOne headerTop="visible">
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <RetailerProductForm />
            <div className="row justify-content-center">
              <div className="col-xl-12 col-lg-12 text-center">
                <br />
                <RetailerProductList />
              </div>
            </div>
            <br />
            <hr />
            <br />

            <div className="row my-5 justify-content-center">
              <h1 style={{ textAlign: "center" }}>Order List</h1>
              <div className="col-xl-12 col-lg-12 text-center">
                <br />
                <RetailerOrderList />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

RetailerPList.propTypes = {
  location: PropTypes.object
};

export default RetailerPList;
