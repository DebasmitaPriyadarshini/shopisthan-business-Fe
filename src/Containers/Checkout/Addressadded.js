import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const AddedAddress = ({ props }) => {
  const auth = useSelector((state) => state.userDetails);
  const history = useHistory();

  return (
    <>
      <div>
        <div className="added-address-sti-div-starts">
          <div className="flex-indelivery-address-home-option">
            <p>Delivery to</p>
            <p className="dellevery-to-down-option"> Home</p>
          </div>
          <p className="addrees-saved-in-user-id-shown-in-one">
            {auth.authenticate && auth.user && auth.user.addressAddress
              ? auth.user.addressAddress
              : "user-address"}
          </p>
        </div>
        <div
          style={{ padding: "10px 20px", borderBottom: "10px solid #f5f5f5" }}
        >
          <button
            className="btn-forchange-andadd-address"
            onClick={() => {
              history.push({
                pathname: "/add-address",
                state: {
                  address: true,
                  edit: true,
                  storeUrl:
                    props.location.state && props.location.state.cart
                      ? props.location.state.storeUrl
                      : null,
                },
              });
            }}
          >
            Edit Address
          </button>
        </div>
      </div>
      <div className="bottom-navigation-for-user-profile-in-store-view">
        <div
          className="btn-for-checout-of-shop-profile-only"
          onClick={() => {
            history.push({
              pathname: "/checkout-payment",
              state: {
                payment: true,
                storeUrl:
                  props.location.state && props.location.state.cart
                    ? props.location.state.storeUrl
                    : "",
              },
            });
          }}
        >
          {" "}
          <h2>Continue</h2>{" "}
        </div>
      </div>
    </>
  );
};

export default AddedAddress;
