import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StoreNavBar = (props) => {
  const { store } = props;


  const cart = useSelector((state) => state.userDetails);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);



  return (
    <>
      <div className="ne-wdasboard-jdfkjf-rf">
        <div className="Dashb-oard-navigation-dsd">
          <div className="logo-plus-every-pages-fdfr">
            <div className="PrimaryNav-coreNavigationLink-2uv">
              <div className="PrimaryNav-logoWrap-564">
                {props.checkout ? (
                  <Link
                    to={`/${store && store.storeUrl ? store.storeUrl : ""}`}
                  >
                    <h2 className="new-store-name-in-navbar-in-store-view">
                      {store && store.storeName ? store.storeName : "Store"}
                    </h2>
                  </Link>
                ) : (
                  <h2
                    className="new-store-name-in-navbar-in-store-view"
                    onClick={props.showStoreProfile}
                  >
                    {store && store.storeName ? store.storeName : "Store"}
                  </h2>
                )}
              </div>
            </div>
          </div>
          <div className="new-akf-vfvdbvc">
            {props.checkout ? null : (
              <>
                <div style={{ display: "flex" }}>
                  <h2
                    className="cart-in-navbar-of-new-store-view"
                    // onClick={() => setShowCart(true)}
                    onClick={props.showCart}
                  >
                    {" "}
                    Cart{" "}
                  </h2>
                  {Object.keys(cartItems) && Object.keys(cartItems).length === 0
                    ? null
                    : <div className="cart-no-count-in-new-nav-user">{Object.keys(cartItems).length}</div>}

                </div>
                <h2
                  className="cart-in-navbar-of-new-store-view"
                  onClick={props.showUserAccount}
                // onClick={() => {
                //     setViewUserAccount(true)
                //     setShowCart(false);
                // }}
                >
                  Account
                </h2>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreNavBar;
