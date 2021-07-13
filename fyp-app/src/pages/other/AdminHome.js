import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import { Button } from "react-bootstrap";

const Foryou = () => {

  return (
    <Fragment>
      <MetaTags>
        <title>RNN-Ware | Admin</title>
      </MetaTags>
      <LayoutFooterless headerTop="visible">
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center" style={{ height: "16em" }}>
                <h1>For you page under process</h1>
                <br />
                <br />
                <br />

                <Link to={"/retailerproductlist"} >
                  <Button>Back to CRM</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LayoutFooterless>
    </Fragment>
  );
};

Foryou.propTypes = {
  location: PropTypes.object
};

export default Foryou;
