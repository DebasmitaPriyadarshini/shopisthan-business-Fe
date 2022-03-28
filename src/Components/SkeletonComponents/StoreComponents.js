import React from "react";
import "./style.css";

const StoreProfileCardSkeleton = () => {
  return (
    <>
      {" "}
      <div className="store-profile-dic-skkelton-view">
        {" "}
        <div>
          <div className="store-profile-curved-skeleton-view" />{" "}
        </div>{" "}
        <div className="skeleton-info">
          <p className="store-jkd-name-in-skeleton-view-in-d" />
          <p className="store-city-view-in-skeletio-on" />{" "}
        </div>{" "}
      </div>
    </>
  );
};

const StoreCategorySkeleton = () => {
  return (
    <>
      {" "}
      <div className="store-profile-dic-skkelton-view">
        {" "}
        <p className="store-category-scroll-in-skeleton" />
      </div>
    </>
  );
};

const StoreSeachBarSkeleton = () => {
  return (
    <>
      {" "}
      <div className="store-profile-dic-skkelton-view">
        {" "}
        <p className="stor-search-bar-in-skeleton" />
      </div>
    </>
  );
};
const StoreProductSingleSkeleton = () => {
  return (
    <>
      {" "}
      <div className="stoore-product-box-skkelton-view">
        {" "}
        <div style={{ width: "100%" }}>
          <div className="product-ske-name-in-skeleton-view"></div>
          <div className="product-ske-category-in-skeleton-view"></div>
          <div className="product-ske-price-and-disscount-in-skeleton-view"></div>
          <div className="product-ske-description-in-skeleton-view"></div>
        </div>{" "}
        <div className="product-ske-image-in-skeleton-view"></div>
      </div>
    </>
  );
};

const StoreNavbarSkeleton = () => {
  return (
    <>
      {" "}
      <div className="Store-navbarname-and-image-of-profile">
        <div style={{ display: "flex", gap: "10px" }}>
          <div className="profile-logo-in-navbar-in-skeleton-view"></div>
          <div>
            <div className="hellow-word-of-navbar-skeleton"></div>
            <div className="shopne-skeleton-view-store"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const StoreShareBoxSkeleton = () => {
  return (
    <>
      {" "}
      <div className="Share-modal-box-in-skeleton-view-in">
        <div>
          <div className="Share-paragrap-skeleton"></div>
          <div className="completed-sharre-storew-store"></div>
        </div>
        <div className="Share-btn-in-skeleton-view-in"></div>
      </div>
    </>
  );
};
const StoreOrderBoxSkeleton = () => {
  return (
    <>
      {" "}
      <div className="Share-modal-box-in-skeleton-view-in">
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export {
  StoreProfileCardSkeleton,
  StoreCategorySkeleton,
  StoreSeachBarSkeleton,
  StoreProductSingleSkeleton,
  StoreNavbarSkeleton,
  StoreShareBoxSkeleton,
  StoreOrderBoxSkeleton,
};
