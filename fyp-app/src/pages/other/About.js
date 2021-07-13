import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";

const About = () => {

  return (
    <Fragment>
      <MetaTags>
        <title>RNN-Ware | About us</title>
      </MetaTags>
      <LayoutOne headerTop="visible">

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-30" spaceBottomClass="pb-40" />

        {/* text grid */}
        <TextGridOne />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

      </LayoutOne>
    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object
};

export default About;
