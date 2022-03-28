import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Redirect, useHistory } from "react-router-dom";
import {
  FreeStorePlanNoOfDaysCompleted,
  StorePlanDeatils,
} from "../../Functions";
import {
  deleteProductByIdAction,
  editProductAction,
  editProductWithPicturesAction,
} from "../../actions/product.action";
import { HomeNabar } from "../../Components/Navbar/index";
import DashBoard from "../../Components/SideMenu-Dashboard";
import StoreSubNavBar from "../../Components/Sub-navbar";
import { InputComponents } from "../../Components/Inputs/index";
import { MessageModal, ReNewStorePlanModal } from "../../Components/Modal";
import StoreEditProductResponsive from "./Responsive";
import Resizer from "react-image-file-resizer";

const StoreEditProduct = (props) => {
  const dispatch = useDispatch();

  const storeDetails = useSelector((state) => state.userStore);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [reNewPlanModal, setReNewPlanModal] = useState(false);

  const productDetails =
    props.location.state &&
    props.location.state.editProduct &&
    props.location.state.productDetails
      ? props.location.state.productDetails
      : null;
  const catalogList = useSelector((state) => state.userStore.storeCatalog);
  const [productCatalog, setProductCatalog] = useState(
    productDetails ? productDetails.productCatalog._id : ""
  );
  const [productName, setProductName] = useState(
    productDetails ? productDetails.productName : ""
  );
  const [productPrice, setProductPrice] = useState(
    productDetails ? productDetails.productPrice : ""
  );
  const [productMrpPrice, setProductMrpPrice] = useState(
    productDetails ? productDetails.productMrpPrice : ""
  );
  const [productDescription, setProductDescription] = useState(
    productDetails ? productDetails.productDescription : ""
  );
  const productId = productDetails ? productDetails._id : "";
  // const [productId, setProductId] = useState(

  // );

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.userStore.error);
  const [productPictures, setProductPictures] = useState([]);
  const [disabledInputText, setDisabledInputText] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [action, setAction] = useState("");
  const storePlanDetails = StorePlanDeatils(
    storeDetails && storeDetails.userStore
      ? storeDetails.userStore.storePlan
      : null
  );

  useEffect(() => {
    if (storeDetails.loading && createError) {
      setLoading(true);
    }
  }, [storeDetails.loading, createError]);

  useEffect(() => {
    if (!storeDetails.loading && createError) {
      if (!storeDetails.loading && createError && error !== "") {
        setShowErrorMessage("Something Went Wrong !!!");
        setShowErrorModal(true);
        setLoading(false);
        setCreateError(false);
        setAction("");
      } else {
        history.push({
          pathname: "/storeProduct",
        });
      }
    }
  }, [storeDetails.loading, createError, error, history]);

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

  if (
    props.location &&
    props.location.state &&
    !props.location.state.editProduct
  ) {
    return null;
  }
  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const editProduct = (e) => {
    e.preventDefault();

    if (!productId) {
      return null;
    }

    if (
      productName === "" ||
      productCatalog === "" ||
      productPrice === "" ||
      productDescription === ""
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

    const form = {
      _id: productId,
      productName,
      productPrice,
      productMrpPrice:
        productMrpPrice.length === 0 ? productPrice : productMrpPrice,
      productDescription,
      productCatalog,
    };
    setAction("Edit");
    setDisabledInputText(true);
    setCreateError(true);
    dispatch(editProductAction(form));
  };

  const deleteProduct = (e) => {
    e.preventDefault();

    if (storePlanDetails && !storePlanDetails.deleteProducts) {
      setShowErrorMessage("You Can't delete the product");
      return setShowErrorModal(true);
    }

    if (!productId) {
      setShowErrorMessage("Something went wrong");
      return setShowErrorModal(true);
    }
    const payload = {
      productId: productId,
    };
    setAction("Delete");
    setCreateError(true);
    dispatch(deleteProductByIdAction(payload));
  };

  const editProductWithPictures = (e) => {
    e.preventDefault();
    if (!productId) {
      return null;
    }

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
    form.append("_id", productId);
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

    setAction("Edit");
    setDisabledInputText(true);
    setCreateError(true);
    dispatch(editProductWithPicturesAction(form));
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
                <h4 style={{ fontSize: "1.5rem" }}>Edit Product</h4>
              </StoreSubNavBar>
              <div>
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
                            setProductName(
                              e.target.value.replace(/\s\s+/g, " ")
                            )
                          }
                          placeholder={"Please Enter  Product Name"}
                          maxLength={150}
                        />
                      </div>
                      {showValidation && productName.length < 3
                        ? showErrorContent(
                            <div
                              style={{ fontSize: "12px", marginBottom: "10px" }}
                            >
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
                          >
                            {catalogList && catalogList.length > 0
                              ? catalogList.map((filterCatalog) => (
                                  <option
                                    className="router-link-exact-active router-link-active NavigationBar-subcategoryLink-3Ua"
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
                            <div
                              style={{ fontSize: "12px", marginBottom: "10px" }}
                            >
                              Select Catalog
                            </div>
                          )
                        : null}
                      <div
                        className="icdsbnlcses"
                        style={{ marginBottom: "10px" }}
                      >
                        <InputComponents
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
                          label={"Discount Price (Customer Buying Price)"}
                          placeholder={"Please Enter  Discount Price"}
                          value={productPrice}
                          onChange={(e) =>
                            setProductPrice(
                              e.target.value.replace(/[^0-9]/g, "")
                            )
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
                              <div
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                              >
                                Product Discount Price Too Long
                              </div>
                            )
                          : null}

                        {showValidation &&
                        productPrice.length < 1 &&
                        validation !== "productPrice"
                          ? showErrorContent(
                              <div
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                              >
                                Enter Product Price
                              </div>
                            )
                          : null}
                        {showValidation &&
                        productPrice.length < 1 &&
                        validation === "productPrice"
                          ? showErrorContent(
                              <div
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                              >
                                Enter Product Price
                              </div>
                            )
                          : null}
                        {showValidation &&
                        productPrice.length < 1 &&
                        validation === "productPrice"
                          ? showErrorContent(
                              <div
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                              >
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
                          maxLength={500}
                        ></textarea>
                        {showValidation && productDescription.length < 4
                          ? showErrorContent(
                              <div
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "10px",
                                }}
                              >
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
                          gap: "10px",
                        }}
                      >
                        {/* {loading ? (
                          <button
                            className="new-create-store-btn-for-home-only"
                            disabled={true}
                          >
                            <i class="fa fa-spinner fa-spin"></i> Adding Product
                          </button>
                        ) : (
                          <button
                            className="new-create-store-btn-for-home-only"
                            onClick={createProduct}
                          >
                            Save
                          </button>
                        )} */}

                        {loading && action === "Edit" ? (
                          <button
                            className="save-product-btn-at-eit-product"
                            disabled={true}
                          >
                            Editing Product
                          </button>
                        ) : productPictures && productPictures.length > 0 ? (
                          <button
                            className="save-product-btn-at-eit-product"
                            onClick={editProductWithPictures}
                          >
                            Save Product
                          </button>
                        ) : (
                          <button
                            className="save-product-btn-at-eit-product"
                            onClick={editProduct}
                          >
                            Save Product
                          </button>
                        )}
                        {loading && action === "Delete" ? (
                          <button
                            className="Delete-btn-at-edit-produtc"
                            disabled={true}
                          >
                            Deleting Product
                          </button>
                        ) : (
                          <button
                            className="Delete-btn-at-edit-produtct"
                            onClick={deleteProduct}
                          >
                            Delete Product
                          </button>
                        )}
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
        {/* <StoreEditProductResponsive productDetails={productDetails} /> */}
      </div>
      <MessageModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={showErrorMessage}
        title={"Message"}
      />

      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />

      {/* / */}
    </>
  );
};

export default StoreEditProduct;
