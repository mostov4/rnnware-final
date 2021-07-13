import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";

const LayoutFooterless = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass
}) => {

  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      {children}
    </Fragment>
  );
};

LayoutFooterless.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string
};

export default LayoutFooterless;
