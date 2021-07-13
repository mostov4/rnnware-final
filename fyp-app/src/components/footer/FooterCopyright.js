import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""
        }`}
    >
      <div className="footer-logo">
        <Link to={"/"}>
          <h3>RNN-WARE</h3>
        </Link>
      </div>
      <p>
        © 2020{" "}
        {/* <a href="#">
          RNN-WARE
        </a> */}
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
