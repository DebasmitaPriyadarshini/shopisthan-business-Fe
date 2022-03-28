import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashBoard from "../../Components/SideMenu-Dashboard/index";
import "./style.css";
import { Redirect, useHistory } from "react-router-dom";
import { HomeNabar } from "../../Components/Navbar/index";
import { InputComponents } from "../../Components/Inputs";
import StoreSubNavBar from "../../Components/Sub-navbar";
import StoreAddProductrespo from "./Responsive/index";
import { FreeStorePlanNoOfDaysCompleted } from "../../Functions";
import { createProductAction } from "../../actions/product.action";
import { MessageModal, ReNewStorePlanModal } from "../../Components/Modal";
import Resizer from "react-image-file-resizer";

const StoreAddProduct = (props) => {
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const catalogList = useSelector((state) => state.userStore.storeCatalog);
  const history = useHistory();
  const [reNewPlanModal, setReNewPlanModal] = useState(false);

  const [productCatalog, setProductCatalog] = useState(
    catalogList && catalogList.length > 0 ? catalogList[0]._id : ""
  );
  const [productName, setProductName] = useState("");
  const [productMrpPrice, setProductMrpPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.userStore.error);
  const [disabledInputText, setDisabledInputText] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");

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

  useEffect(() => {
    if (storeDetails.loading && createError) {
      setLoading(true);
    }
  }, [storeDetails.loading, createError]);

  useEffect(() => {
    if (!storeDetails.loading && createError) {
      if (!storeDetails.loading && createError && error !== "") {
        setDisabledInputText(false);
        setShowErrorMessage("Something Went Wrong !!!");
        setShowErrorModal(true);
        setLoading(false);
        setCreateError(false);
      } else {
        if (
          props &&
          props.location &&
          props.location.state &&
          props.location.state.FourSetps
        ) {
          history.push({
            pathname: "/storeDashboard",
          });
        } else {
          history.push({
            pathname: "/storeProduct",
          });
        }
      }
    }
  }, [storeDetails.loading, createError, error, props, history]);

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

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const createProduct = (e) => {
    e.preventDefault();
    if (
      productName === "" ||
      productCatalog === "" ||
      productPrice === "" ||
      productDescription === "" ||
      productPictures.length === 0
    ) {
      return setShowValidation(true);
    }

    if (isNaN(productPrice)) {
      return showErrorMsg("phoneNumber");
    }

    if (productMrpPrice.length !== 0) {
      if (isNaN(productMrpPrice)) {
        return showErrorMsg("productMrpPrice");
      }
      if (Number(productPrice) > Number(productMrpPrice)) {
        return showErrorMsg("productPrice");
      }
    }

    const form = new FormData();
    form.append("productName", productName);
    form.append("productCatalog", productCatalog);
    form.append("productPrice", productPrice);
    form.append(
      "productMrpPrice",
      productMrpPrice.length === 0 ? productPrice : productMrpPrice
    );
    form.append("productDescription", productDescription);

    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }

    setDisabledInputText(true);
    setCreateError(true);
    dispatch(createProductAction(form));
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "WEBP",
        100,
        0,
        (uri) => {
          setProductPictures([...productPictures, uri]);
        },
        "file"
      );
    });

  const handleProductPictures = async (e) => {
    try {
      e.preventDefault();

      if (e.target.files.length === 0) {
        return null;
      }

      const fsize = e.target.files[0].size;

      if (fsize > 2e6) {
        setShowErrorMessage("File to long");
        return setShowErrorModal(true);
      } else {
        const file = e.target.files[0];
        const image = await resizeFile(file);
        // return setProductPictures([...productPictures, e.target.files[0]]);
        // return setImage(URL.createObjectURL(e.target.files[0]));
      }
    } catch (err) {
      return null;
    }
  };

  const showErrorContent = (msg) => {
    return <div className="error-mafg-in-validdatiom-in-inout-area">{msg}</div>;
  };

  const renderUploadImage = () => {
    return (
      <>
        <div>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleProductPictures}
            style={{ display: "none" }}
          />
          <label for="file">
            <img
              className="preview-image-in-adding-product"
              src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
              alt="selectedImage"
            />
          </label>
        </div>
      </>
    );
  };

  const removeImage = (index) => {
    const newProductPictures = productPictures.filter(
      (drink, index1) => index1 !== index
    );
    return setProductPictures(newProductPictures);
  };

  const renderPrevieImage = () => {
    return productPictures.map((product, index) => (
      <div key={index}>
        <img
          src={URL.createObjectURL(product)}
          alt="previewImage"
          className="preview-image-in-adding-product"
        />
        <div>
          <button
            className="remove-btn-at-add-aeimc-ds"
            onClick={() => removeImage(index)}
          >
            Remove{" "}
          </button>
        </div>
      </div>
    ));
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
                <h4 style={{ fontSize: "1.5rem" }}>Add Product</h4>
              </StoreSubNavBar>

              <div style={{ display: "flex", gap: "20px", marginTop: "3em" }}>
                <div
                  style={{
                    background: "#fff",
                    width: "25em",
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0px",
                  }}
                >
                  <div>
                    <div
                      className="icdsbnlcses"
                      style={{ marginBottom: "10px" }}
                    >
                      <InputComponents
                        label={" Product Title*"}
                        value={productName}
                        onChange={(e) =>
                          setProductName(e.target.value.replace(/\s\s+/g, " "))
                        }
                        disabled={disabledInputText}
                        placeholder={"Please Enter  Product Name"}
                        maxLength={150}
                      />
                    </div>
                    {showValidation && productName.length < 3
                      ? showErrorContent(
                          <div className="error-mafg-in-validdatiom-in-inout-area">
                            Please Enter Product Name
                          </div>
                        )
                      : null}
                    <div
                      className="icdsbnlcses"
                      style={{ marginBottom: "10px" }}
                    >
                      <label className="label-for-user-profile-label-only">
                        Choose Catalog*
                      </label>
                      <div className="select">
                        <select
                          id="CountryDropdown-for-user-profile-only"
                          value={productCatalog}
                          onChange={(e) => setProductCatalog(e.target.value)}
                          disabled={disabledInputText}
                        >
                          {catalogList && catalogList.length > 0
                            ? catalogList.map((filterCatalog) => (
                                <option
                                  id="CountryDropdown-for-user-profile-only"
                                  key={filterCatalog._id}
                                  value={filterCatalog._id}
                                >
                                  {filterCatalog.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                    {showValidation && productCatalog.length === 0
                      ? showErrorContent(
                          <div className="error-mafg-in-validdatiom-in-inout-area">
                            Select Catalog
                          </div>
                        )
                      : null}
                    <div
                      className="icdsbnlcses"
                      style={{ marginBottom: "10px" }}
                    >
                      <InputComponents
                        type="number"
                        name={"Product MRP"}
                        label={"Product MRP*  "}
                        placeholder="Enter Selling Price..."
                        value={productMrpPrice}
                        onChange={(e) => {
                          setProductMrpPrice(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                        }}
                        disabled={disabledInputText}
                        onKeyDown={(e) =>
                          (e.keyCode === 69 || e.keyCode === 190) &&
                          symbolsArr.includes(e.key) &&
                          e.preventDefault()
                        }
                      />
                    </div>

                    <div
                      className="icdsbnlcses"
                      style={{ marginBottom: "10px" }}
                    >
                      <InputComponents
                        type="number"
                        label={"  Discount Price (Customer Buying Price)"}
                        value={productPrice}
                        placeholder={"Please Enter  Discount Price"}
                        onChange={(e) =>
                          setProductPrice(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        disabled={disabledInputText}
                        onKeyDown={(e) =>
                          (e.keyCode === 69 || e.keyCode === 190) &&
                          e.preventDefault()
                        }
                      />
                      {showValidation &&
                      validation === "productPrice" &&
                      Number(productPrice) > Number(productMrpPrice) &&
                      productMrpPrice.length !== 0
                        ? showErrorContent(
                            <div className="error-mafg-in-validdatiom-in-inout-area">
                              Product Discount Price Too Long
                            </div>
                          )
                        : null}

                      {showValidation &&
                      productPrice.length < 1 &&
                      validation !== "productPrice"
                        ? showErrorContent(
                            <div className="error-mafg-in-validdatiom-in-inout-area">
                              Enter Product Price
                            </div>
                          )
                        : null}
                      {showValidation &&
                      productPrice.length < 1 &&
                      validation === "productPrice"
                        ? showErrorContent(
                            <div className="error-mafg-in-validdatiom-in-inout-area">
                              Enter Product Price
                            </div>
                          )
                        : null}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    width: "25em",
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0px",
                  }}
                >
                  <div>
                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {productPictures && productPictures.length > 0
                          ? renderPrevieImage()
                          : null}

                        {productPictures && productPictures.length < 3
                          ? renderUploadImage()
                          : null}
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {" "}
                        {showValidation && productPictures.length === 0
                          ? showErrorContent(
                              <div className="error-mafg-in-validdatiom-in-inout-area">
                                Select Product Picture
                              </div>
                            )
                          : null}{" "}
                      </div>
                    </div>
                    <div style={{ marginTop: "2em", padding: "0px 20px" }}>
                      <label className="label-for-user-profile-label-only">
                        Description *
                      </label>
                      <textarea
                        row="10"
                        cols="10"
                        className="NEw-description-field"
                        placeholder="Enter Description"
                        value={productDescription}
                        onChange={(e) =>
                          setProductDescription(
                            e.target.value.replace(/\s\s+/g, " ")
                          )
                        }
                        disabled={disabledInputText}
                        maxLength={500}
                      ></textarea>
                      {showValidation && productDescription.length < 4
                        ? showErrorContent(
                            <div className="error-mafg-in-validdatiom-in-inout-area">
                              Enter Description
                            </div>
                          )
                        : null}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "1.5em",
                        marginRight: "1.5em",
                      }}
                    >
                      {loading ? (
                        <button
                          className="new-create-store-btn-for-home-only"
                          disabled={true}
                        >
                          Adding Product
                        </button>
                      ) : (
                        <button
                          className="new-create-store-btn-for-home-only"
                          onClick={createProduct}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashBoard>
        </div>
      </div>
      <div className="responsive-dashbord-view-block">
        {/* <StoreAddProductrespo /> */}
      </div>
      <MessageModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={showErrorMessage}
        title={"No Product Added"}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreAddProduct;
