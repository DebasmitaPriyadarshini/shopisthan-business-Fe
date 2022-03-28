import React from "react";

const OrderDate = ({ date }) => {
  if (!date) {
    return null;
  }
  const renderDate = (datetime) => {
    const date = new Date(datetime);
    const mlist = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = date.getMonth();
    var dt = date.getDate();
    const year = date.getFullYear();
    if (dt < 10) {
      dt = "0" + dt;
    }

    // December 01, 2020
    return mlist[month] + " " + dt + ", " + year;
    // return dt + "/" + mlist[month];
  };

  return (
    <>
      <p>{renderDate(date)}</p>
    </>
  );
};

export default OrderDate;
