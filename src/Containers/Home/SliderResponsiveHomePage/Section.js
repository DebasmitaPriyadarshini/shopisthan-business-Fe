import React from "react";
import "./Section.css";

const Section = (props) => {
  return (
    <>
      <div className="innerSection">{props.section_number}</div>
    </>
  );
};
export default Section;
