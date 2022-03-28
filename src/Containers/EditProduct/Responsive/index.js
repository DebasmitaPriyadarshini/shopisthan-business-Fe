import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Redirect, Link, useHistory } from "react-router-dom";
import {
  deleteProductByIdAction,
  editProductAction,
  editProductWithPicturesAction,
} from "../../../actions/product.action";
import { InputComponents, InputDescription } from "../../../Components/Inputs";
import {
  MessageModal,
  ReNewStorePlanModal,
  ShareModal,
  SmallPopUp,
} from "../../../Components/Modal";
import { FreeStorePlanNoOfDaysCompleted } from "../../../Functions";
import Resizer from "react-image-file-resizer";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";

const StoreEditProductResponsive = (props) => {
  const productDetails =
    props.location.state &&
    props.location.state.editProduct &&
    props.location.state.productDetails
      ? props.location.state.productDetails
      : null;
  const dispatch = useDispatch();
  const storeDetails = useSelector((state) => state.userStore);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [smallModal, setSmallModal] = useState(false);

  const close = (value) => {
    setSmallModal(false);
  };

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

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.userStore.error);
  const [productPictures, setProductPictures] = useState([]);
  const [disabledInputText, setDisabledInputText] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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
        setShowErrorMessage("Something Went Wrong !!!");
        setShowErrorModal(true);
        setLoading(false);
        setCreateError(false);
      } else {
        history.push({
          pathname: "/storeProduct",
        });
      }
    }
  }, [storeDetails.loading, createError, error, history]);

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
  if (auth.user.store === "No") {
    return (
      <Redirect
        to={{
          pathname: `/signin`,
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
    setDisabledInputText(true);
    setCreateError(true);
    dispatch(editProductAction(form));
  };

  const deleteProduct = (e) => {
    e.preventDefault();
    if (!productId) {
      setShowErrorModal("Something went wrong");
      return setShowErrorModal(true);
    }
    const payload = {
      productId: productId,
    };

    setCreateError(true);
    dispatch(deleteProductByIdAction(payload));
  };

  const editProductWithPictures = (e) => {
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

  // const handleProductPictures = (e) => {
  //   const fsize = e.target.files[0].size;

  //   if (fsize > 2e6) {
  //     setProductPictures([]);
  //     setShowErrorModal("File to long");
  //     return setShowErrorModal(true);
  //   } else {
  //     return setProductPictures([...productPictures, e.target.files[0]]);
  //   }
  // };
  const showErrorContent = (msg) => {
    return <span style={{ color: "red" }}>{msg}</span>;
  };

  const renderUploadImage = () => {
    return (
      <>
        <div>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleProductPictures1}
            style={{ display: "none" }}
          />
          <label for="file">
            <img
              className="preview-image-in-adding-product"
              src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
              alt="Select_Image"
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
          alt="preview_image"
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
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Edit Product</h2>
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
                    maxLength={150}
                    placeholder={"Product Title"}
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
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="Store-add-product-view-responsive">
          <div className="Add-product-in-resposnonsive-oci">
            <label className="label-for-user-profile-label-only">Images*</label>
            <div className="new-addproduct-input-div-mar">
              <div className="image-preview-in-add-product-new-t">
                {productPictures && productPictures.length > 0
                  ? renderPrevieImage()
                  : null}

                {productPictures && productPictures.length < 3
                  ? renderUploadImage()
                  : null}
              </div>
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
              label={"MRP"}
              placeholder="MRP Price"
              name={"Product MRP"}
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
              value={productPrice}
              label={"Selling Price(Customer Buying Price)*"}
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
          {showValidation &&
          productPrice.length < 1 &&
          validation === "productPrice"
            ? showErrorContent(
                <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                  Enter Product Price
                </div>
              )
            : null}
        </div>{" "}
        <div className="save-btn-in-responsice-bt-m" style={{ gap: "20px" }}>
          {loading ? (
            <button className="add-product-nsjue" disabled={true}>
              Editing Product
            </button>
          ) : productPictures && productPictures.length > 0 ? (
            <button
              className="add-product-nsjue"
              onClick={editProductWithPictures}
            >
              Edit Product
            </button>
          ) : (
            <button className="add-product-nsjue" onClick={editProduct}>
              Edit Product
            </button>
          )}
          <button className="delete-product-nsjue" disabled={true}>
            Delete Product
          </button>
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
        title={"Message"}
      />
      <SmallPopUp
        visible={smallModal}
        onClose={() => setSmallModal(false)}
        close={close}
        loading={loading}
        deleteProduct={deleteProduct}
        shareProduct={() => setShowShareModal(true)}
      />
      <ShareModal
        show={showShareModal}
        handleclose={() => setShowShareModal(false)}
        shareLink={`${productName}/p/${productDetails.productId}`}
        shareTitle={`Take a look at ${productName} on Shopisthan`}
      />
    </>
  );
};

export default StoreEditProductResponsive;

{
  /* 

      <div className="Store-followers-list-in-responsive">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              background: "#fff",
            }}
          >
            <div className="image-preview-in-add-product-new-t">
              {productPictures && productPictures.length > 0
                ? renderPrevieImage()
                : null}

              {productPictures && productPictures.length < 3
                ? renderUploadImage()
                : null}
            </div>
           
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
        <div className="Add-product-in-resposnonsive-oci">
          <div className="for-inner--scroll-not-allowed">
            <div className="new-addproduct-input-div-mar">
              <div className="icdsbnlcses">
                <InputComponents
                  label={"Title*"}
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value.replace(/\s\s+/g, " "))
                  }
                  disabled={disabledInputText}
                  maxLength={150}
                  placeholder={"Product Title"}
                />
              </div>
              {showValidation && productName.length < 3
                ? showErrorContent(
                  <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                    Please Enter Product Name
                  </div>
                )
                : null}
              <div className="icdsbnlcses">
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
              </div>
              {showValidation && productCatalog.length === 0
                ? showErrorContent(
                  <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                    Select Catalog
                  </div>
                )
                : null}
            </div>
            <div className="new-addproduct-input-div-mar">
              <div className="icdsbnlcses">
                <InputComponents
                  type="number"
                  label={"MRP"}
                  placeholder="MRP Price"
                  name={"Product MRP"}
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
              <div className="icdsbnlcses">
                <InputComponents
                  value={productPrice}
                  label={"Selling Price(Customer Buying Price)*"}
                  placeholder={"Selling Price"}
                  onChange={(e) =>
                    setProductPrice(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  disabled={disabledInputText}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
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
              {showValidation &&
                productPrice.length < 1 &&
                validation === "productPrice"
                ? showErrorContent(
                  <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                    Enter Product Price
                  </div>
                )
                : null}
            </div>
            <div className="new-addproduct-input-div-mar">
              <div className="icdsbnlcses">
                
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
              </div>
            </div>
            <div className="save-btn-in-responsice-bt-m">
              {loading ? (
                <button className="edit-product-lajdne" disabled={true}>
                  Saving Product
                </button>
              ) : productPictures && productPictures.length > 0 ? (
                <button
                  className="edit-product-lajdne"
                  onClick={editProductWithPictures}
                >
                  Save Product
                </button>
              ) : (
                <button className="edit-product-lajdne" onClick={editProduct}>
                  Save Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */
}
