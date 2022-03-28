import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import {
  addCatalogAction,
  deleteCatalogByIdAction,
  editCatalogAction,
} from "../../../actions/store.action";
import {
  MessageModal,
  Modal,
  ReNewStorePlanModal,
} from "../../../Components/Modal";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
  StorePlanDeatils,
} from "../../../Functions";
import HambergurForProfile from "../../../Components/HambergurProfile";
import { BottomNavigationDashboard } from "../../../Components/BottomNavigation/index";
import { outOfStockProductAction } from "../../../actions/product.action";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";
const StoreProductResponsive = ({ props }) => {
  const [humburgerModal, setShowHumburgerModal] = useState(false);
  const storeDetails = useSelector((state) => state.userStore);
  const history = useHistory();
  const productList = useSelector((state) => state.userStore.storeProduct);
  const catalogList = useSelector((state) => state.userStore.storeCatalog);
  const dispatch = useDispatch();
  const [showCatalog, setShowCatalog] = useState(
    props &&
      props.location &&
      props.location.state &&
      props.location.state.showCatalog
      ? true
      : false
  );
  const [showProduct, setShowProduct] = useState(
    props &&
      props.location &&
      props.location.state &&
      props.location.state.showCatalog
      ? false
      : true
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState("");
  const storePlanDetails = StorePlanDeatils(
    storeDetails && storeDetails.userStore
      ? storeDetails.userStore.storePlan
      : null
  );
  const noOfStoreProducts = storeDetails.storeProduct
    ? storeDetails.storeProduct.length
    : null;

  const noOfStoreCatalogs = catalogList ? catalogList.length : null;

  const [showAddCatalogModal, setShowAddCatalogModal] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showLoadingDeleteButton, setShowLoadingDeleteButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogSearchTerm, setCatalogSearchTerm] = useState("");

  const close = (value) => {
    setShowHumburgerModal(false);
  };
  const [catalog, setCatalog] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [editCatalogDetails, setEditCatalogDetails] = useState("");
  const [editCatalogName, setEditCatalogName] = useState("");
  const [showEditCatalogModal, setShowEditCatalogModal] = useState(false);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [focused, setFocused] = useState(false);

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
    if (
      showLoadingButton &&
      !storeDetails.error &&
      storeDetails.loading &&
      storeDetails.message === "Saved"
    ) {
      setValidation("");
      setShowValidation(false);
      setShowLoadingButton(false);
      setShowErrorMsg(false);
      setCatalog("");
      setShowAddCatalogModal(false);
      setEditCatalogName("");
      setEditCatalogDetails("");
      setShowEditCatalogModal(false);
      setShowLoadingDeleteButton(false);
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
      setShowErrorMsg(true);
      setShowLoadingDeleteButton(false);
    }
  }, [
    showLoadingButton,
    storeDetails.error,
    storeDetails.loading,
    storeDetails.message,
  ]);

  const addNewCatalog = (e) => {
    e.preventDefault();
    if (catalog === "") {
      setValidation("");
      return setShowValidation(true);
    }
    if (
      catalog.toLocaleLowerCase().split(" ").join("") === "all" ||
      catalog.toLocaleLowerCase().trim() === "all"
    ) {
      validation("Catalog");
      return setShowValidation(true);
    }
    setShowLoadingButton(true);
    setShowErrorMsg(false);
    dispatch(addCatalogAction({ name: catalog }));
  };

  const editCatalog = (e) => {
    e.preventDefault();
    if (!editCatalogName && !editCatalogDetails) {
      return null;
    }
    if (!editCatalogName) {
      setValidation("");
      return setShowValidation(true);
    }

    if (
      editCatalogName.toLocaleLowerCase().split(" ").join("") === "all" ||
      editCatalogName.toLocaleLowerCase().trim() === "all"
    ) {
      setValidation("EditCatalog");
      return setShowValidation(true);
    }

    if (editCatalogName === editCatalogDetails.name) {
      return setShowEditCatalogModal(false);
    }

    const from = {
      _id: editCatalogDetails._id,
      name: editCatalogName,
    };
    setShowLoadingButton(true);
    dispatch(editCatalogAction(from));
  };

  const RenderEditCatalogModal = () => {
    if (!editCatalogName && !editCatalogDetails) {
      return null;
    }

    return (
      <Modal
        visible={showEditCatalogModal}
        onClose={() => {
          setValidation("");
          setShowValidation(false);
          setEditCatalogName("");
          setEditCatalogDetails("");
          setShowEditCatalogModal(false);
        }}
        size="lg"
      >
        <div>
          <div className="frist-div-input-validation-pop-up">
            <div className="content">
              <h2 className="prob">Edit Catalog</h2>
              <p className="paragraph-for-the-errormseg">
                <input
                  className="large-input-type-in-every-form"
                  placeholder="Example - Laptop, T-shirts...."
                  value={editCatalogName}
                  onChange={(e) => setEditCatalogName(e.target.value)}
                  maxLength={30}
                ></input>
              </p>
              {showValidation && editCatalogName === ""
                ? "InVaild Catalog Name"
                : null}
              {(showValidation &&
                validation === "EditCatalog" &&
                editCatalogName.toLocaleLowerCase().split(" ").join("") ===
                  "all") ||
              editCatalogName.toLocaleLowerCase().trim() === "all"
                ? "You can't take this catalog name"
                : null}
              <div style={{ display: "flex", gap: "10px" }}>
                {showLoadingButton && !showLoadingDeleteButton ? (
                  <button className="got-it-and-close-btn">Editing</button>
                ) : (
                  <button
                    className="got-it-and-close-btn"
                    onClick={editCatalog}
                  >
                    Edit
                  </button>
                )}

                {showLoadingDeleteButton ? (
                  <button className="got-it-and-close-btn">Deleting</button>
                ) : (
                  <button
                    className="got-it-and-close-btn"
                    onClick={() => deleteCatalog(editCatalogDetails._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              {showErrorMsg
                ? "something went wrong please try again later"
                : null}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const RenderAddCatalogModal = () => {
    return (
      <Modal
        visible={showAddCatalogModal}
        onClose={() => {
          setValidation("");
          setShowValidation(false);
          setCatalog("");
          setShowAddCatalogModal(false);
        }}
        size="lg"
      >
        <div>
          <div className="frist-div-input-validation-pop-up">
            <div className="content">
              <h2 className="prob">Add Category</h2>
              <p className="paragraph-for-the-errormseg">
                <input
                  className="large-input-type-in-every-form"
                  placeholder="Example - Laptop, T-shirts...."
                  value={catalog}
                  onChange={(e) =>
                    setCatalog(e.target.value.replace(/\s\s+/g, " "))
                  }
                  maxLength={30}
                ></input>
              </p>
              {showValidation && catalog === "" ? (
                <div className="error-mafg-in-validdatiom-in-inout-area">
                  Invaild Category Name
                </div>
              ) : null}
              {(showValidation &&
                validation === "Catalog" &&
                catalog.toLocaleLowerCase().split(" ").join("") === "all") ||
              catalog.toLocaleLowerCase().trim() === "all" ? (
                <div className="error-mafg-in-validdatiom-in-inout-area">
                  You can't take this catalog name
                </div>
              ) : null}
              <div style={{ display: "flex", gap: "10px" }}>
                {showLoadingButton ? (
                  <button className="got-it-and-close-btn">Adding...</button>
                ) : (
                  <button
                    className="got-it-and-close-btn"
                    onClick={addNewCatalog}
                  >
                    Add
                  </button>
                )}

                <button
                  className="got-it-and-close-btn"
                  onClick={() => {
                    setValidation("");
                    setShowValidation(false);
                    setCatalog("");
                    setShowAddCatalogModal(false);
                  }}
                >
                  Close
                </button>
              </div>
              {showErrorMsg
                ? "something went wrong please try again later"
                : null}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const addProduct = () => {
    if (storePlanDetails.noOfProducts > noOfStoreProducts) {
      return history.push({
        pathname: "/store-Add-Product",
      });
    } else {
      setShowErrorModalMessage("No More Proudct will be added");
      return setShowErrorModal(true);
    }
  };

  const addCatalog = () => {
    if (storePlanDetails.unlimitedCatalog) {
      return setShowAddCatalogModal(true);
    } else {
      if (storePlanDetails.noOfCatalogs > noOfStoreCatalogs) {
        return setShowAddCatalogModal(true);
      } else {
        setShowErrorModalMessage("No More Catalog will be added");
        return setShowErrorModal(true);
      }
    }
  };

  const proceed = (product) => {
    history.push({
      pathname: "/store-Edit-Product",
      state: {
        productDetails: product,
        editProduct: true,
      },
    });
  };

  const proceedToView = (product) => {
    history.push({
      pathname: "/storeProduct/p",
      state: {
        productDetails: product,
        viewProduct: true,
      },
    });
  };

  const toggleChecked = (product) => {
    if (product.productOutOfStock === "No") {
      const productOutOfStock = {
        _id: product._id,
        productOutOfStock: "Yes",
        productId: product.productId,
      };
      dispatch(outOfStockProductAction(productOutOfStock));
    } else {
      const productOutOfStock = {
        _id: product._id,
        productOutOfStock: "No",
        productId: product.productId,
      };
      dispatch(outOfStockProductAction(productOutOfStock));
    }
  };

  const renderProductLists = (productList) => {
    return productList.map((product, index) => (
      <div className="background-ehte" key={index}>
        <div className="divisin-for-product-view-in-store-view">
          <div className="new-img-div-for-product-img-fixed">
            <img
              className="imginstoreproducts"
              src={product.productPictures[0].img}
              alt={product.productName}
            />
          </div>
          <div className="display-flex-for-product-details-inrespo">
            <div className="desplayflex-inresponsive-view">
              <div>
                <div className="newpcnwoelaxk">
                  <div>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 className="product-name-in-new-produtc-card-indashboard">
                        {product.productName}
                      </h4>
                    </div>
                    <div className="product-price-both-discount-and-productp">
                      <span className="new-dprocedindaboadrdaddboarpd">
                        {" "}
                        {PriceWithComma(product.productPrice)}
                      </span>
                      {product.productMrpPrice ? (
                        product.productPrice ===
                        product.productMrpPrice ? null : (
                          <p className="discount-price-inresponsive-store-product-page">
                            ₹{product.productMrpPrice}
                          </p>
                        )
                      ) : null}
                    </div>
                  </div>
                  {storePlanDetails && storePlanDetails.stockProducts ? (
                    <div data-label="Items">
                      <Switch
                        onChange={() => toggleChecked(product)}
                        checked={
                          product.productOutOfStock === "No" ? false : true
                        }
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#cee5d0"
                        offColor="#007f61"
                      />
                      <h3 style={{ fontSize: "12px" }}>
                        {" "}
                        {product.productOutOfStock === "No"
                          ? "Available"
                          : "Out Of Stock"}
                      </h3>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="displays-flex-for-category-iname-in-products">
                  {/* <p className="category-tag-in-product">Catalog - </p> */}
                  <h2 className="catergory-name-jdygrer">
                    {product.productCatalog
                      ? product.productCatalog.name
                      : null}
                  </h2>
                </div>
                <div className="new-bnt-of-view-and-edit-flex">
                  {storePlanDetails && storePlanDetails.editProducts ? (
                    <button
                      className="new-edit-btn-at-bottm-in-product-view-only"
                      onClick={() => proceed(product)}
                    >
                      Edit
                    </button>
                  ) : null}{" "}
                  {storePlanDetails && storePlanDetails.editProducts ? (
                    <button
                      className="new-edit-btn-at-bottm-in-product-view-only"
                      onClick={() => proceedToView(product)}
                    >
                      View
                    </button>
                  ) : null}
                </div>
              </div>

              {/* <div className="product-edit-and-deleteoption">
                {storePlanDetails && storePlanDetails.editProducts ? (
                  <button
                    className="deikeosfncocfkrv"
                    onClick={() => proceed(product)}
                  >
                    Edit
                  </button>
                ) : null}
                <Link
                  className="deikeosfncocfkrv"
                  to={{
                    pathname: `/${product.productName.split(" ").join("-")}/p/${
                      product.productId
                    }`,
                    state: {
                      Store: true,
                      storeID: storeDetails.userStore._id,
                    },
                  }}
                >
                  View
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="share-btn-in-product-in-store-vew">
            {" "}
            <button
              className="share-btn-in-product-n-dashboard"
              onClick={() => {
                setShareProductDetails(product);
                setShowShareModal(true);
              }}
            >
              Share Product
            </button>
          </div> */}
      </div>
    ));
  };

  const renderProducts = () => {
    if (productList && productList.length === 0) {
      return (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h2 className="ops-in-no-product-catelog">Oops!!!</h2>
              <p className="no-ciocalpcds">No Product in your Online Store.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <img
                  style={{ height: "10em" }}
                  src={ImportImage.NoProduct}
                  alt="ShopisthanLogo"
                />
              </div>
              <p className="no-ciocalpcds">Add Product</p>{" "}
            </div>
          </div>{" "}
        </div>
      );
    }
    if (searchTerm === "") {
      return renderProductLists(productList);
    } else {
      const filterdProducts = productList.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join("")) ||
          product.productCatalog.name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join("")) ||
          product.productId
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join(""))
      );

      return filterdProducts && filterdProducts.length > 0 ? (
        renderProductLists(filterdProducts)
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h2 className="ops-in-no-product-catelog">Oops!!!</h2>
              <p className="no-ciocalpcds">No Product in your Online Store.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <img
                  style={{ height: "10em" }}
                  src={ImportImage.NoProduct}
                  alt="ShopisthanLogo"
                />
              </div>
              <p className="no-ciocalpcds">Add Product</p>{" "}
            </div>
          </div>{" "}
        </div>
      );
    }
  };

  const deleteCatalog = (catalogId) => {
    const productWithCatalog = productList.filter(
      (product) => product.productCatalog._id === catalogId
    );
    if (productWithCatalog && productWithCatalog.length > 0) {
      setShowErrorModalMessage("You can't delete this catalog");
      return setShowErrorModal(true);
    } else {
      const payload = {
        _id: catalogId,
      };
      setShowLoadingDeleteButton(true);
      setShowLoadingButton(true);
      dispatch(deleteCatalogByIdAction(payload));
    }
  };

  const renderNoOfProductsInThisCatalog = (catalogId) => {
    const noOfProducts =
      productList && productList.length > 0
        ? productList.filter(
            (product) => product.productCatalog._id === catalogId
          ).length
        : 0;

    return `${noOfProducts} ${
      noOfProducts === 0 || noOfProducts === 1 ? "product" : "products"
    } in this catalog`;
  };

  //   <button
  //   className="new-edit-btn-at-bottm-in-product-view-only"
  //   onClick={() => {
  //     setEditCatalogName(catalog.name);
  //     setEditCatalogDetails(catalog);
  //     setShowEditCatalogModal(true);
  //   }}
  // >
  //   Edit
  // </button>

  const addProductLogoInCatalogList = (catalogId) => {
    return (
      <div
        className="catelog-of-products-inc-catecla"
        onClick={() => {
          history.push({
            pathname: "/store-Add-Product",
            state: { catalog: true, catalogId: catalogId },
          });
        }}
      >
        <h2>+ Add</h2>
      </div>
    );
  };

  const renderProductImagesInThisCatalog = (catalogId) => {
    if (productList && productList.length === 0) {
      return addProductLogoInCatalogList(catalogId);
    } else {
      const getProductListOfCurrentCatalog = productList.filter(
        (product) => product.productCatalog._id === catalogId
      );
      if (
        getProductListOfCurrentCatalog &&
        getProductListOfCurrentCatalog.length > 0
      ) {
        return (
          <>
            {addProductLogoInCatalogList(catalogId)}
            {getProductListOfCurrentCatalog.map((product, index) => (
              <>
                <img
                  className="img-of-product-in-catelogs-of-product"
                  alt={product.productName}
                  src={product.productPictures[0].img}
                />
              </>
            ))}
          </>
        );
      } else {
        return addProductLogoInCatalogList(catalogId);
      }
    }
  };

  const renderCatalogList = (catalogList) => {
    return (
      <div>
        {catalogList.map((catalog, index) => (
          <div className="border-kc-cxus">
            <div className="cosiuhcsjmd">
              <h2 className="catelogs-name-jbvialln"> {catalog.name}</h2>
              {catalog.name !== "All" ? (
                <p
                  className="buxcviac"
                  onClick={() => {
                    setEditCatalogName(catalog.name);
                    setEditCatalogDetails(catalog);
                    setShowEditCatalogModal(true);
                  }}
                >
                  Edit
                </p>
              ) : null}
            </div>
            <p className="number-of-productincareo">
              {renderNoOfProductsInThisCatalog(catalog._id)}
            </p>
            <div className="flex-caregols-in-product-dide-caregol">
              {renderProductImagesInThisCatalog(catalog._id)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCatalogs = () => {
    if (catalogList && catalogList.length === 0) {
      return (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img
                style={{ height: "10em" }}
                src={ImportImage.NoCatalog}
                alt="ShopisthanLogo"
              />
              <h2
                style={{
                  color: "grey",
                  lineHeight: "2",
                  padding: "10px 5px",
                  fontSize: "24px",
                }}
              >
                No Catalogs
              </h2>{" "}
              <h2
                style={{
                  color: "grey",
                  lineHeight: "2",
                  padding: "10px 5px",
                  fontSize: "24px",
                }}
              >
                Add Your First Catalog
              </h2>{" "}
              <button
                onClick={addCatalog}
                className="medium-button-compo-btn"
                style={{
                  background: "black",
                }}
              >
                Add Catalog
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (catalogSearchTerm === "") {
      return renderCatalogList(catalogList);
    } else {
      const filterdCatalog = catalogList.filter(
        (cat) =>
          cat.name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(catalogSearchTerm.toLowerCase().split(" ").join("")) ||
          cat.catalogId
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(catalogSearchTerm.toLowerCase().split(" ").join(""))
      );
      return filterdCatalog && filterdCatalog.length > 0 ? (
        renderCatalogList(filterdCatalog)
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h2>Oops!!!</h2>
              <img
                style={{ height: "10em" }}
                src={ImportImage.NoCatalog}
                alt="ShopisthanLogo"
              />
              <h2
                style={{
                  color: "grey",
                  lineHeight: "2",
                  padding: "10px 5px",
                  fontSize: "24px",
                }}
              >
                Oooppss..! No Such Catalog found
              </h2>{" "}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <NavbarForDash>
        {" "}
        <Link to="/storeDashboard">
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Products</h2>
      </NavbarForDash>
      <div style={{ marginTop: "60px" }}>
        <div className="product-and-category-divided-inrespo-div">
          <div className="serach-down-asclna">
            {showProduct ? (
              <h2
                className="products-in-responsibe-jdks"
                onClick={() => {
                  setShowProduct(true);
                  setShowCatalog(false);
                  setSearchTerm("");
                }}
              >
                All Products
              </h2>
            ) : (
              <h2
                className="not-active-componts-in-products-and-catelogs"
                onClick={() => {
                  setShowProduct(true);
                  setShowCatalog(false);
                }}
              >
                All Products
              </h2>
            )}
            {storeDetails &&
            storeDetails.userStore &&
            storeDetails.userStore.catalogFeature ? (
              showCatalog ? (
                <h2
                  className="products-in-responsibe-jdks"
                  onClick={() => {
                    setShowCatalog(true);
                    setShowProduct(false);
                  }}
                >
                  Catalogs
                </h2>
              ) : (
                <h2
                  className="not-active-componts-in-products-and-catelogs"
                  onClick={() => {
                    setShowCatalog(true);
                    setShowProduct(false);
                  }}
                >
                  Catalogs
                </h2>
              )
            ) : null}
            {/* {
              showCatalog ? (
              <h2
                className="products-in-responsibe-jdks"
                onClick={() => {
                  setShowCatalog(true);
                  setShowProduct(false);
                }}
              >
                Catalogs
              </h2>
            ) : (
              <h2
                className="not-active-componts-in-products-and-catelogs"
                onClick={() => {
                  setShowCatalog(true);
                  setShowProduct(false);
                }}
              >
                Catalogs
              </h2>
            )
            } */}{" "}
          </div>
          <div className="search-at-navbar-in-all-product-rresponsive">
            <svg viewBox="0 0 12 12" class="SearchTypeahead-icon-fornavdash">
              <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
            </svg>
            <input
              className="new-search-for-every-navbar-in-stare-dashboard"
              type="search"
              name="search"
              autoComplete="off"
              placeholder={
                showProduct
                  ? "Search with product name "
                  : "Search with category name "
              }
              aria-label="Search "
              style={{ outline: "none" }}
              value={showProduct ? searchTerm : catalogSearchTerm}
              onChange={(e) =>
                showProduct
                  ? setSearchTerm(e.target.value)
                  : setCatalogSearchTerm(e.target.value)
              }
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>

        <div className="main-siv-for-padding-in-fit-nav">
          {showProduct ? renderProducts() : null}
          {showCatalog ? renderCatalogs() : null}
        </div>
      </div>
      {!focused ? (
        <>
          {showProduct ? (
            <div className="bottom-add-product-btn" onClick={addProduct}>
              <div className="add-product-btn-in-center-kjhg">
                <span className="title svelte-1b3vcum">Add product</span>
              </div>
            </div>
          ) : (
            <div className="bottom-add-product-btn" onClick={addCatalog}>
              <div className="add-product-btn-in-center-kjhg">
                <span className="title svelte-1b3vcum">Add catalog</span>
              </div>
            </div>
          )}
        </>
      ) : null}
      {showAddCatalogModal ? RenderAddCatalogModal() : null}
      {showEditCatalogModal ? RenderEditCatalogModal() : null}
      {/* </Link> */}
      <HambergurForProfile
        show={humburgerModal}
        handleclose={() => setShowHumburgerModal(false)}
        close={close}
      />
      <MessageModal
        visible={showErrorModal}
        onClose={() => {
          setShowErrorModalMessage("");
          setShowErrorModal(false);
        }}
        message={showErrorModalMessage}
        title={"Message"}
      />
      {/* <CatalogModal /> */}
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
      <BottomNavigationDashboard show={focused} />
    </>
  );
};

export default StoreProductResponsive;
