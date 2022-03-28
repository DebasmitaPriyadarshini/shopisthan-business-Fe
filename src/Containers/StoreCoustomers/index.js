import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
} from "../../Functions";
import OrderDate from "../../Components/Order-Date";
import { HomeNabar } from "../../Components/Navbar/index";
import DashBoard from "../../Components/SideMenu-Dashboard";
import StoreSubNavBar from "../../Components/Sub-navbar";
import OrderDetialsModal from "../../Components/OrderModal";
import StoreFollowersResponsive from "./Responsive";
import { ReNewStorePlanModal } from "../../Components/Modal";
import { ImportImage } from "../../Components/ImportedImages";

const StoreCoustomers = () => {
  const storeDetails = useSelector((state) => state.userStore);
  const auth = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const orderList =
    storeDetails && storeDetails.storeOrder ? storeDetails.storeOrder : null;
  const [orderDetails, setOrderDetails] = useState("");
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  function findUnique(arr, predicate) {
    if (!arr) {
      return null;
    }
    var found = {};
    arr.forEach((d) => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map((key) => found[key]);
  }

  const customerList = findUnique(
    storeDetails && storeDetails.storeOrder ? storeDetails.storeOrder : null,
    (d) => d.user._id
  );

  const [coustomerDetails, setCoustomersDetails] = useState(
    customerList && customerList.length > 0 ? customerList[0] : null
  );

  useEffect(() => {
    if (
      storeDetails &&
      storeDetails.userStore &&
      storeDetails.userStore.storePlanType &&
      storeDetails.userStore.storePlanType === "Free"
    ) {
      if (
        FreeStorePlanNoOfDaysCompleted(storeDetails.userStore.storeStartedDate)
      ) {
        return setReNewPlanModal(true);
      }
    } else {
      return setReNewPlanModal(false);
    }
  }, [storeDetails]);

  if (!auth.authenticate) {
    return (
      <Redirect
        to={{
          pathname: `/signin`,
          state: { storeId: "Store", Store: true },
        }}
      />
    );
  }

  const renderNumberOfOrderByCoustomer = (coustomer) => {
    const coustomerOrders =
      orderList && orderList.length > 0
        ? orderList.filter((order) => order.user._id === coustomer.user._id)
            .length
        : 0;

    return `${coustomerOrders} ${
      coustomerOrders === 0 || coustomerOrders === 1 ? "order" : "orders"
    } from ${coustomer.addressName ? coustomer.addressName : "User"} so far`;
  };

  const renderCustomerListDetails = (customerList) => {
    return customerList.map((customer, index) => (
      <tr
        className="mnbnmnb-udndv-oshrhdueh"
        key={index + 1}
        onClick={() => {
          setCoustomersDetails(customer);
        }}
      >
        <td
          className="follower-name-or-customer-name-in-ajska"
          data-label="S.No"
        >
          {customer.addressName ? customer.addressName : "User"}
        </td>

        <td
          className="follower-name-or-customer-name-in-ajska"
          data-label="Order Id"
        >
          {renderNumberOfOrderByCoustomer(customer)}
        </td>
      </tr>
    ));
  };

  const renderCustomerList = () => {
    if (searchTerm === "" || searchTerm === null) {
      return renderCustomerListDetails(customerList);
    }
    if (searchTerm !== "" || searchTerm !== null) {
      const filterCustomerList = customerList.filter((customer) =>
        customer.addressName
          ? customer.addressName
              .toLowerCase()
              .split(" ")
              .join("")
              .includes(searchTerm.toLowerCase().split(" ").join(""))
          : null
      );
      return filterCustomerList && filterCustomerList.length > 0 ? (
        renderCustomerListDetails(filterCustomerList)
      ) : (
        <>
          <div className="nofollowers-at-new-fkfrfdf">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: "20em" }}
                src={ImportImage.NoCustomers}
                alt="Customer"
              />
            </div>
            <h2>Oooppss..! No Such Customer found</h2>
          </div>
        </>
      );
    }
  };

  const close = (value) => {
    setOrderDetailsModal(false);
  };

  const renderCustomerOrderLists = () => {
    if (orderList && orderList.length === 0) {
      return null;
    }
    if (!coustomerDetails) {
      return null;
    }
    const CustomerOrders =
      orderList && orderList.length > 0
        ? orderList.filter(
            (order) => order.user._id === coustomerDetails.user._id
          )
        : null;

    if (CustomerOrders && CustomerOrders.length > 0) {
      return CustomerOrders.map((order, index) => (
        <tr
          className="mnbnmnb-udndv-oshrhdueh"
          key={index}
          onClick={() => {
            setOrderDetailsModal(true);
            setOrderDetails(order);
          }}
        >
          <td className="jfkvvjvsv" data-label="S.No">
            #{order.orderId}
          </td>
          <td className="jfkvvjvsv" data-label="S.No">
            <OrderDate date={order.createdAt} />
          </td>
          <td className="jfkvvjvsv" data-label="Amount">
            {PriceWithComma(order.totalAmount)}
          </td>
          <td className="jfkvvjvsv" data-label="Order Id">
            {order.orderStatus
              ? order.orderStatus === "Not Available"
                ? "Rejected"
                : order.orderStatus
              : "New Order"}
          </td>
        </tr>
      ));
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="dashboard-destop-view-only">
        <div style={{ background: "#EFF1FF", height: "100vh" }}>
          <HomeNabar />

          <DashBoard
            storeDetail={storeDetails}
            sidebar
            userName={auth.user.name}
            userPic={auth.user.picture}
            storeName={storeDetails.userStore.storeName}
            storeCity={storeDetails.userStore.storeCity}
            storeProfilePicture={
              storeDetails.userStore.storeProfilePicture &&
              storeDetails.userStore.storeProfilePicture.img
                ? storeDetails.userStore.storeProfilePicture.img
                : ""
            }
          >
            <div className="lkjhasdrfr">
              <StoreSubNavBar>
                <h2 style={{ fontSize: "1.5rem" }}>Customers</h2>
              </StoreSubNavBar>
              <div style={{ display: "flex", gap: "5em", marginTop: "3em" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <div className="SearchTypeahead-for-store-dash-nav">
                      <div className="SearchTypeahead-searchIcon-1ld">
                        <svg
                          viewBox="0 0 12 12"
                          className="SearchTypeahead-icon-fornavdash"
                        >
                          <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
                        </svg>
                      </div>
                      <input
                        type="search"
                        name="search"
                        autoComplete="off"
                        placeholder="Search by customer name"
                        aria-label="Search "
                        className="SearchTypeahead-nav-store-dash-input"
                        style={{ outline: "none" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div className="new-table-for-store-vendor-customers-only-vndor-side">
                  <div>
                    <div className="new-order-table-div-for-user-order">
                      <div className="new-order-table-new">
                        <div>
                          <table className="table-new-table">
                            <thead className="oknbhgrtyfc">
                              <th className="new-order-table-heeder">
                                {" "}
                                Customer Name
                              </th>
                              <th className="new-order-table-heeder">Orders</th>
                            </thead>
                            {/* ) : null} */}

                            <tbody className="lgadkyhdtq">
                              {customerList && customerList.length > 0 ? (
                                renderCustomerList()
                              ) : (
                                <div className="nofollowers-at-new-fkfrfdf">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      style={{ height: "20em" }}
                                      src={ImportImage.NoCustomers}
                                      alt="Customer"
                                    />
                                  </div>
                                  <h2>
                                    No Customers please Share your Store to get
                                    new Orders
                                  </h2>
                                </div>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="new-table-for-store-vendor-customers-only-vndor-side">
                  <div>
                    <div className="new-order-table-div-for-user-order">
                      <div className="new-order-table-new">
                        <div>
                          <div
                            className="oknbhgrtyfc-oenc-customer-serv"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h3>Customer Deatils </h3>
                          </div>
                          <div className="onbh-oenc-customer-serv">
                            <h3 style={{ marginBottom: "0.2rem" }}>
                              Name -{" "}
                              {coustomerDetails && coustomerDetails.addressName
                                ? coustomerDetails.addressName
                                : "User Name"}
                            </h3>
                            <h3 style={{ marginBottom: "0.2rem" }}>
                              Address -{" "}
                              {coustomerDetails && coustomerDetails.address
                                ? coustomerDetails.address
                                : "User Adress"}
                            </h3>
                          </div>

                          <table className="table-new-table">
                            <thead className="oknbhgrtyfc">
                              <th className="new-order-table-heeder">
                                {" "}
                                Order Id
                              </th>
                              <th className="new-order-table-heeder">
                                {" "}
                                Order Date
                              </th>
                              <th className="new-order-table-heeder">
                                Order Price
                              </th>
                              <th className="new-order-table-heeder">Status</th>
                            </thead>

                            <tbody className="lgadkyhdtq">
                              {renderCustomerOrderLists()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashBoard>
        </div>
      </div>
      <div className="responsive-dashbord-view-block">
        <StoreFollowersResponsive />
      </div>
      <OrderDetialsModal
        type={"Store"}
        show={orderDetailsModal}
        handleclose={() => setOrderDetailsModal(false)}
        orderDetails={orderDetails}
        close={close}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreCoustomers;
