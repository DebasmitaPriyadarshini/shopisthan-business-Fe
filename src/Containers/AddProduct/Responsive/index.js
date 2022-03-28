import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Redirect, Link, useHistory } from "react-router-dom";
import { createProductAction } from "../../../actions/product.action";
import { InputComponents, InputDescription } from "../../../Components/Inputs";
import { MessageModal, ReNewStorePlanModal } from "../../../Components/Modal";
import { FreeStorePlanNoOfDaysCompleted } from "../../../Functions";
import Resizer from "react-image-file-resizer";
import Addlogo from "../../../img/Icon awesome-file-upload.png";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";

const StoreAddProductrespo = (props) => {
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const catalogList = useSelector((state) => state.userStore.storeCatalog);
  const history = useHistory();
  const [productCatalog, setProductCatalog] = useState(
    props &&
      props.location &&
      props.location.state &&
      props.location.state.catalog
      ? props.location.state.catalogId
      : catalogList && catalogList.length > 0
      ? catalogList[0]._id
      : ""
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
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  useEffect(() => {
    if (storeDetails.loading && createError) {
      setLoading(true);
    }
  }, [storeDetails.loading, createError]);
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
          props.location.state.storeProgress
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
  }, [storeDetails.loading, createError, error, history]);

  if (!auth.authenticate) {
    return (
      <Redirect
        to={{
          pathname: `/Signin`,
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

  const handleProductPictures1 = async (e) => {
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
    return <span style={{ color: "red" }}>{msg}</span>;
  };

  const renderUploadImage = () => {
    return (
      <>
        {/* <div> */}
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleProductPictures1}
          style={{ display: "none" }}
        />

        <label htmlFor="file">
          <div className="display-axbc-flex-jci-for-logo-add-option">
            <div className="cvuyiwuejomkld">
              <div className="display-in-center-logo-add-image">
                <img
                  src={Addlogo}
                  style={{ paddingTop: "1em " }}
                  alt="Add-product-logo"
                />
              </div>

              <div
                // onChange={handleProductPictures1}
                className="Upload-Logo-option-in-store-profile-cnb"
              >
                Product image
              </div>
            </div>
          </div>
        </label>
        {/* </div>
        {" "} */}
        {/* <div className="display-axbc-flex-jci-for-logo-add-option">
          <div className="cvuyiwuejomkld">
            <div className="display-in-center-logo-add-image">
              <img src={Addlogo} style={{ paddingTop: "1em " }} />
            </div>

            <button
              // onChange={handleProductPictures1}
              className="Upload-Logo-option-in-store-profile-cnb"
            >
              Product image
            </button>
          </div>
        </div> */}
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
      <NavbarForDash>
        {" "}
        <Link
          to={{
            pathname: "/storeProduct",
            state: {
              showCatalog:
                props &&
                props.location &&
                props.location.state &&
                props.location.state.catalog
                  ? true
                  : false,
            },
          }}
        >
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Add Products</h2>
      </NavbarForDash>
      <div className="background-grey-in-all-page-of-add-product">
        <div className="Store-add-product-view-responsive">
          <div>
            <div>
              <div className="new-addproduct-input-div-mar">
                <div className="voispomcs-pi">
                  <InputComponents
                    label={"Title*"}
                    value={productName}
                    onChange={(e) =>
                      setProductName(e.target.value.replace(/\s\s+/g, " "))
                    }
                    disabled={disabledInputText}
                    placeholder={"Enter Product name"}
                    maxLength={150}
                  />
                </div>
                {showValidation && productName.length < 3
                  ? showErrorContent(
                      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                        Please Enter Product Name
                      </div>
                    )
                  : null}

                <InputDescription
                  label={"Product Description"}
                  placeholder={"Product Description"}
                  value={productDescription}
                  onChange={(e) =>
                    setProductDescription(e.target.value.replace(/\s\s+/g, " "))
                  }
                  disabled={disabledInputText}
                  maxLength={500}
                />
                {showValidation && productDescription.length < 4
                  ? showErrorContent(
                      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                        Enter Description
                      </div>
                    )
                  : null}

                {showValidation && productCatalog.length === 0
                  ? showErrorContent(
                      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                        Select Catalog
                      </div>
                    )
                  : null}
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="Store-add-product-view-responsive">
          <div className="Add-product-in-resposnonsive-oci">
            <label className="label-for-user-profile-label-only">Images*</label>
            <div className="new-addproduct-input-div-mar">
              <div
                className="image-preview-in-add-product-new-t"
                style={{ display: "flex", justifyContent: "left" }}
              >
                {productPictures && productPictures.length > 0
                  ? renderPrevieImage()
                  : null}

                {productPictures && productPictures.length < 3
                  ? renderUploadImage()
                  : null}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              {showValidation && productPictures.length === 0
                ? showErrorContent(
                    <div style={{ fontSize: "12px", marginTop: "10px" }}>
                      Select Product Picture
                    </div>
                  )
                : null}{" "}
            </div>
          </div>
        </div>
        <div className="Store-add-product-view-responsive">
          <div className="voispomcs-pi">
            <label className="label-for-user-profile-label-only">
              Category*
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
            <div className="e-category-work-cbka">
              <p>It seems you don't have a category of your product. To</p>{" "}
              <div className="category-paragraph-inc-sadd-product">
                {" "}
                <p>add new category,</p>{" "}
                <Link to="/storeProduct">
                  {" "}
                  <h2 style={{ color: "#000" }}>click here</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="Store-add-product-view-responsive"
          style={{ paddingBottom: "10px" }}
        >
          <div className="voispomcs-pi">
            <label className="label-for-user-profile-label-only">
              Pricing*
            </label>

            <InputComponents
              type="number"
              name={"MRP"}
              label={"MRP"}
              placeholder="MRP Price"
              value={productMrpPrice}
              onChange={(e) => {
                setProductMrpPrice(e.target.value.replace(/[^0-9]/g, ""));
              }}
              disabled={disabledInputText}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) &&
                symbolsArr.includes(e.key) &&
                e.preventDefault()
              }
            />
          </div>
          <div>
            <InputComponents
              type="number"
              label={"Selling Price(Customer Buying Price)*"}
              value={productPrice}
              placeholder={"Selling Price"}
              onChange={(e) =>
                setProductPrice(e.target.value.replace(/[^0-9]/g, ""))
              }
              disabled={disabledInputText}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
            />
          </div>
          {showValidation &&
          validation === "productPrice" &&
          Number(productPrice) > Number(productMrpPrice) &&
          productMrpPrice.length !== 0
            ? showErrorContent(
                <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                  Product Discount Price Too Long
                </div>
              )
            : null}
          {showValidation &&
          productPrice.length < 1 &&
          validation !== "productPrice"
            ? showErrorContent(
                <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                  Enter Product Price
                </div>
              )
            : null}
        </div>{" "}
        <div className="save-btn-in-responsice-bt-m">
          {loading ? (
            <button className="add-product-nsjue" disabled={true}>
              Adding Product
            </button>
          ) : (
            <button className="add-product-nsjue" onClick={createProduct}>
              Add Product
            </button>
          )}
        </div>
      </div>
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
      <MessageModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={showErrorMessage}
        title={"No Product Added"}
      />
    </>
  );
};

export default StoreAddProductrespo;
