import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  deleteCatalogByIdAction,
  editCatalogAction,
} from "../../actions/store.action";
import {
  CatalogModal,
  MessageModal,
  ReNewStorePlanModal,
} from "../../Components/Modal";
import { HomeNabar } from "../../Components/Navbar/index";
import DashBoard from "../../Components/SideMenu-Dashboard";
import StoreSubNavBar from "../../Components/Sub-navbar";
import {
  FreeStorePlanNoOfDaysCompleted,
  StorePlanDeatils,
} from "../../Functions";
import "./style.css";
import { InputComponents } from "../../Components/Inputs";
import { ImportImage } from "../../Components/ImportedImages";

const StoreCatelog = () => {
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore);
  const storeCatalogList = useSelector((state) => state.userStore.storeCatalog);
  const productList = useSelector((state) => state.userStore.storeProduct);
  const [catalogModal, setCatalogModal] = useState(false);
  const [editCatalogModal, setEditCatalogModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState(null);
  const [catalogId, setCatalogId] = useState(null);
  const [catalogName, setCatalogName] = useState(null);
  const planDetails = StorePlanDeatils(
    storeDetails && storeDetails.userStore
      ? storeDetails.userStore.storePlan
      : null
  );
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [showEditCatalogErrorMsg, setShowEditCatalogErrorMsg] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    if (
      showLoadingButton &&
      !storeDetails.error &&
      storeDetails.loading &&
      storeDetails.message === "Saved"
    ) {
      setValidation("");
      setShowValidation(false);
      setCatalogId(null);
      setShowLoadingButton(false);
      setShowEditCatalogErrorMsg(false);
      setEditCatalogModal(false);
    }
    if (
      showLoadingButton &&
      storeDetails.error &&
      !storeDetails.loading &&
      !storeDetails.message
    ) {
      setValidation("");
      setShowValidation(false);
      setShowLoadingButton(false);
      setShowEditCatalogErrorMsg(true);
    }
  }, [
    showLoadingButton,
    storeDetails.error,
    storeDetails.loading,
    storeDetails.message,
  ]);

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

  const close = (value) => {
    setCatalogModal(false);
  };

  const onClose = () => {
    setEditCatalogModal(false);
  };

  const editCatalog = (e) => {
    e.preventDefault();

    if (!catalogId) {
      return null;
    }
    if (!catalog) {
      setValidation("");
      return setShowValidation(true);
    }

    if (
      catalog.toLocaleLowerCase().split(" ").join("") === "all" ||
      catalog.toLocaleLowerCase().trim() === "all"
    ) {
      setValidation("EditCatalog");
      return setShowValidation(true);
    }

    if (catalog === catalogName) {
      return setEditCatalogModal(false);
    }

    const from = {
      _id: catalogId,
      name: catalog,
    };
    setActionMsg("Saving...");
    setShowLoadingButton(true);
    dispatch(editCatalogAction(from));
  };

  const deleteCatalog = () => {
    const productWithCatalog = productList.filter(
      (product) => product.productCatalog._id === catalogId
    );

    if (productWithCatalog && productWithCatalog.length > 0) {
      setShowErrorMsg("You can't delete this catalog");
      return setShowError(true);
    } else {
      const payload = {
        _id: catalogId,
      };
      setActionMsg("Deleting...");
      setShowLoadingButton(true);
      dispatch(deleteCatalogByIdAction(payload));
    }
  };

  const renderEditCatalogModal = () => {
    if (!catalog && !catalogId) {
      return null;
    }
    return (
      <div className="modal-for-error-type-msg">
        <div className="popup-box-for-adding-catelog">
          <div className="box-for-adding-catelof-box-peifbg">
            <div className="close-for-caetologs">
              <label className="box-for-adding-catelo-label-fhef">
                Edit Catalog Name
              </label>
              <span className="close-icon">
                <div onClick={onClose}>
                  <b>x</b>
                </div>
              </span>
            </div>
            <div className="content-for-img-store">
              <div className="new-adding-ac-catelogs-and-input">
                <InputComponents
                  placeholder="Example - Laptop, T-shirts...."
                  value={catalog}
                  onChange={(e) =>
                    setCatalog(e.target.value.replace(/\s\s+/g, " "))
                  }
                  maxLength={30}
                />
              </div>
              {showValidation && catalog === "" ? "InVaild Catalog Name" : null}
              {(showValidation &&
                validation === "EditCatalog" &&
                catalog.toLocaleLowerCase().split(" ").join("") === "all") ||
              catalog.toLocaleLowerCase().trim() === "all"
                ? "You can't take this catalog name"
                : null}
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {showLoadingButton ? (
                    <button
                      style={{ width: "6em" }}
                      className="save-product-btn-at-eit-product"
                    >
                      {actionMsg}
                    </button>
                  ) : (
                    <>
                      <button
                        style={{ width: "6em" }}
                        className="save-product-btn-at-eit-product"
                        onClick={editCatalog}
                      >
                        Save
                      </button>
                      <button
                        style={{ width: "6em" }}
                        className="Delete-btn-at-edit-produtct"
                        onClick={deleteCatalog}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
                {showEditCatalogErrorMsg
                  ? "something went wrong please try again later"
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const catalogListResult = (storeCatalogList) => {
    return storeCatalogList.map((catalog, index) => (
      <div style={{ display: "flex" }} key={index}>
        <div className="categlogt-rt-details-jhds" data-label="S.No">
          {index + 1}
        </div>
        <div className="catelogue-in-table-cjkf" data-label="Order Id">
          {catalog.name}
        </div>
        <div className="categlogt-rt-details-jhds" data-label="Customer">
          #{catalog.name !== "All" ? catalog.catalogId : 100}
        </div>
        <div className="categlogt-rt-details-jhds" data-label="Amount">
          {productList && productList.length > 0
            ? productList.filter(
                (product) => product.productCatalog._id === catalog._id
              ).length
            : 0}
        </div>
        <div className="categlogt-rt-details-jhds" data-label="Items">
          {catalog.name !== "All" ? (
            <button
              className="new-store-catelog-edit-btn-only"
              onClick={() => {
                setCatalog(catalog.name);
                setCatalogId(catalog._id);
                setCatalogName(catalog.name);
                setEditCatalogModal(true);
              }}
            >
              Edit
            </button>
          ) : null}{" "}
        </div>
      </div>
    ));
  };

  const renderCatalogList = () => {
    if (storeCatalogList && storeCatalogList.length < 0) {
      return null;
    }
    if (searchTerm === "") {
      return storeCatalogList && storeCatalogList.length > 0
        ? catalogListResult(storeCatalogList)
        : null;
    }
    if (searchTerm !== "" || searchTerm !== null) {
      const filterdCatalog =
        storeCatalogList && storeCatalogList.length > 0
          ? storeCatalogList.filter(
              (cat) =>
                cat.name
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .includes(searchTerm.toLowerCase().split(" ").join("")) ||
                cat.catalogId
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .includes(searchTerm.toLowerCase().split(" ").join(""))
            )
          : null;
      return filterdCatalog && filterdCatalog.length > 0 ? (
        catalogListResult(filterdCatalog)
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <img
            style={{ height: "20em" }}
            src={ImportImage.NoCatalog}
            alt="ShopisthanLogo"
          />
          <h2
            style={{
              color: "grey",
              lineHeight: "2",
              textAlign: "center",
              padding: "10px 5px",
              fontSize: "24px",
            }}
          >
            Oooppss..! No Such Catalog found
          </h2>{" "}
        </div>
      );
    }
  };

  const addCatalogAction = () => {
    setEditCatalogModal(false);
    setCatalogModal(true);
  };

  return (
    <>
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
              {" "}
              <h2 style={{ fontSize: "1.5rem" }}>Store Catalogs</h2>
            </StoreSubNavBar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "3em",
              }}
            >
              <div style={{ display: "flex" }}>
                <Link to="/storeProduct">
                  <h3 className="inactive-way-sofhresd">Products</h3>
                </Link>
                <h3 className="product-active-in-all-sdhe">Catalogs</h3>
              </div>
              <div>
                <div className="SearchTypeahead-for-store-dash-nav">
                  <div className="SearchTypeahead-searchIcon-1ld">
                    <svg
                      viewBox="0 0 12 12"
                      class="SearchTypeahead-icon-fornavdash"
                    >
                      <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    name="search"
                    autoComplete="off"
                    placeholder="Search by Catalog name or id.."
                    aria-label="Search "
                    className="SearchTypeahead-nav-store-dash-input"
                    style={{ outline: "none" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginLeft: "8px" }}>
                  <button
                    className="medium-button-compo-btn"
                    onClick={addCatalogAction}
                  >
                    Add New Catalog
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="new-order-table-div-for-user-order">
                  <div className="new-order-table-new">
                    <div>
                      <table className="table-new-table">
                        <div className="cdf-fkj-dflwe-dsd">
                          <div className="categolo-dnew-ldkse">Sr.No</div>
                          <div className="catelog-name-in-full-lenght">
                            Catalog Title
                          </div>
                          <div className="categolo-dnew-ldkse">Catalog ID</div>
                          <div className="categolo-dnew-ldkse">
                            Number of Items
                          </div>
                          {planDetails && planDetails.editCatalog ? (
                            <th className="categolo-dnew-ldkse">Action</th>
                          ) : null}
                        </div>

                        <tbody className="catelogue-new-table-dashboard">
                          {storeCatalogList && storeCatalogList.length > 0 ? (
                            renderCatalogList()
                          ) : (
                            <div className="new-no-ejkdjbkfersdf">
                              {" "}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  style={{ height: "20em" }}
                                  src={ImportImage.NoCatalog}
                                  alt="Catgoryicon"
                                />
                              </div>
                              <h2
                                style={{
                                  color: "#363636",
                                  lineHeight: "2",
                                  textAlign: "center",
                                  paddingTop: "10px",
                                  fontSize: "24px",
                                }}
                              >
                                No Catalogs
                              </h2>{" "}
                              <p
                                style={{
                                  textAlign: "center",
                                  paddingBottom: "10px",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  color: "grey",
                                }}
                              >
                                Add Your First Catalog
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  className="medium-button-compo-btn"
                                  onClick={addCatalogAction}
                                >
                                  Add Catalog
                                </button>
                              </div>
                            </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashBoard>
      </div>
      {editCatalogModal ? renderEditCatalogModal() : null}
      <MessageModal
        visible={showError}
        onClose={() => {
          setShowErrorMsg("");
          setShowError(false);
        }}
        message={showErrorMsg}
        title={"Message"}
      />
      <CatalogModal
        visible={catalogModal}
        onClose={() => setCatalogModal(false)}
        Close={close}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreCatelog;
