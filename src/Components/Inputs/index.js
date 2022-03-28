import React from "react";
import "./style.css";

const InputComponents = (props) => {
  return (
    <>
      {props.type && props.type === "select" ? (
        <>
          <label className="label-for-user-profile-label-only">
            {props.label}
          </label>
          <select
            id="CountryDropdown-for-user-profile-only"
            value={props.value}
            onChange={props.onChange}
          >
            {props.cat && props.options && props.options.length > 0
              ? props.options.map((type, index) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))
              : props.storeType && props.options && props.options.length > 0
                ? props.options.map((type, index) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))
                : null}
          </select>
        </>
      ) : (
        <>
          <label className="label-for-user-profile-label-only">
            {props.label}
          </label>
          <input
            value={props.value}
            type={props.type}
            onChange={props.onChange}
            className="profile-nput-only"
            placeholder={props.placeholder}
            name={props.name}
            readOnly={props.readOnly}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
          ></input>
        </>
      )}
    </>
  );
};


const InputDescription = (props) => {
  return (
    <>

      <label className="label-for-user-profile-label-only">
        {props.label}
      </label>
      <textarea
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        className="descriptiokn-box-in-rescponsive-view-only"
        placeholder={props.placeholder}
        name={props.name}
        readOnly={props.readOnly}
        maxLength={props.maxLength}
      ></textarea>
    </>

  );
};


export { InputComponents, InputDescription };
