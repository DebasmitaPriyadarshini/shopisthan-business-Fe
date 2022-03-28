import React from "react";
import "./style.css";

const Storeprofilediv = (props) => {
  return (
    <div>
      <div className="new-store-dashboard-profile-div-two">
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "6ren" }}
        >
          {props.pic === "" || props.pic === null ? (
            <div className="new-store-firsy-letter">
              <span>
                {props && props.name
                  ? props.name.charAt(0).toUpperCase()
                  : null}
              </span>
            </div>
          ) : (
            <img
              className="new-store-dashboard-profile-pic"
              src={props.pic}
              alt={props.name}
            ></img>


          )}
        </div>

        {/* </Link>  */}
      </div>
      
      <div className="new-store-profile-name-and-add-div">
        <h2 className="new-Store-name-and-add-div">{props.name}</h2>
        {/* {props.type === "Store" ? (
          <h2 className="new-Store-name-and-add-div">{props.name}</h2>
        ) : (
          <h2 className="new-Store-name-and-add-div">
            {props.name.slice(0, 8) +
              props.name.charAt(8).toUpperCase() +
              props.name.slice(9)}
          </h2>
        )} */}
      </div>
    </div>
  );
};

export default Storeprofilediv;
{/* <img
              className="new-store-dashboard-profile-pic"
              src={props.pic}
              alt={props.name}
            ></img> */}