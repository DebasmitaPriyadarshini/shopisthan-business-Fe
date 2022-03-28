import React, { useState } from "react";
import StoreSingleProduct from "../StoreSingleProduct";
import "./style.css";
import { CatalogOptionsModal } from "../Modal";
import { ImportImage } from "../ImportedImages";
import SampleStoreSingleProduct from "./singleproduct";

export const SampleStoreViewProductSide = (props) => {
    const { store, product, catalogTerm1, catalog } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [showCatalogModal, setShowCatalogModal] = useState(false);




    const selectedCatalog = (val) => {
        setShowCatalogModal(false);
        return props.onCatalogChange(val);
    };



    const renderNoProducts = (msg) => {
        return (
            <>
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <>
                        <img
                            className="no-product-image-in-stroe-view-in-user-side"
                            src={ImportImage.NoProduct}
                            alt={"Shopisthan"}
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
                            {msg}

                        </h2>
                    </>
                </div>
            </>
        );
    }


    const productListByAction = () => {
        if (catalogTerm1 === "" && searchTerm === "") {
            return product;
        } else if (catalogTerm1 !== "" && searchTerm === "") {
            return product.filter((product) =>
                product.productCatalog.includes(catalogTerm1)
            );
        } else if (searchTerm !== "" && catalogTerm1 === "") {

            return product.filter((product) =>
                product.productName
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(searchTerm.toLowerCase().split(" ").join("")))
        } else if (searchTerm !== "" && catalogTerm1 !== "") {
            return product.filter(
                (product) =>
                    product.productCatalog.includes(catalogTerm1) &&
                    product.productName
                        .toLowerCase()
                        .split(" ")
                        .join("")
                        .includes(searchTerm.toLowerCase().split(" ").join("")))
        } else {
            return product;
        }
    }

    const renderProduct = () => {
        if (product && product.length === 0) {
            return renderNoProducts("No Products on this store");
        } else {
            const productLists = productListByAction();
            if (productLists && productLists.length > 0) {
                return (
                    <div className="for-respo-and-desktop-display">
                        <div className="StoreProductGridView">
                            {productLists.map((product) => (
                                <SampleStoreSingleProduct
                                    product={product}
                                    storeDetails={store}
                                />
                            ))}
                        </div>
                    </div>
                );
            } else {
                return renderNoProducts("Oooppss..! No Such Product found");
            }
        }

        // else if (catalogTerm1 === "" && searchTerm === "") {
        //     return (
        //         <div className="for-respo-and-desktop-display">
        //             <div className="StoreProductGridView">
        //                 {product.map((product) => (
        //                     <StoreSingleProduct
        //                         product={product}
        //                         storeDetails={store}
        //                     />
        //                 ))}
        //             </div>
        //         </div>
        //     );
        // }
        // if (catalogTerm1 !== "" && searchTerm === "") {
        //     const filterdCatalogProducts = product.filter((product) =>
        //         product.productCatalog.includes(catalogTerm1)
        //     );
        //     return (
        //         <div className="for-respo-and-desktop-display">
        //             {filterdCatalogProducts && filterdCatalogProducts.length > 0 ? (
        //                 filterdCatalogProducts.map((product) => (
        //                     <div className="StoreProductGridView">
        //                         <StoreSingleProduct
        //                             product={product}
        //                             storeDetails={store}
        //                         />
        //                     </div>
        //                 ))
        //             ) : (
        //                 <div style={{ display: "flex", justifyContent: "center" }}>
        //                     <div>
        //                         <img
        //                             className="no-product-image-in-stroe-view-in-user-side"
        //                             src={ImportImage.NoProduct}
        //                             alt={"Shopisthan"}
        //                         />
        //                         <h2
        //                             style={{
        //                                 color: "grey",
        //                                 lineHeight: "2",
        //                                 textAlign: "center",
        //                                 padding: "10px 5px",
        //                                 fontSize: "24px",
        //                             }}
        //                         >
        //                             Oooppss..! No Such Product found
        //                         </h2>
        //                     </div>
        //                 </div>
        //             )}
        //         </div>
        //     );
        // }
        // if (searchTerm !== "" && catalogTerm1 === "") {
        //     const filterdSearchProducts = product.filter((product) =>
        //         product.productName
        //             .toLowerCase()
        //             .split(" ")
        //             .join("")
        //             .includes(searchTerm.toLowerCase().split(" ").join(""))
        //     );
        //     return (
        //         <div className="for-respo-and-desktop-display">
        //             {filterdSearchProducts && filterdSearchProducts.length > 0 ? (
        //                 filterdSearchProducts.map((product) => (
        //                     <div className="StoreProductGridView">
        //                         <StoreSingleProduct
        //                             product={product}
        //                             storeDetails={store}
        //                         />
        //                     </div>
        //                 ))
        //             ) : (
        //                 <>
        //                     <div style={{ display: "flex", justifyContent: "center" }}>
        //                         <img
        //                             className="no-product-image-in-stroe-view-in-user-side"
        //                             src={ImportImage.NoProduct}
        //                             alt={"Shopisthan"}
        //                         />
        //                     </div>
        //                     <h2
        //                         style={{
        //                             color: "grey",
        //                             lineHeight: "2",
        //                             textAlign: "center",
        //                             padding: "10px 5px",
        //                             fontSize: "24px",
        //                         }}
        //                     >
        //                         Oooppss..! No Such Product found
        //                     </h2>
        //                 </>
        //             )}
        //         </div>
        //     );
        // }

        // if (searchTerm !== "" && catalogTerm1 !== "") {
        //     const filterdCatalogSearchProducts = product.filter(
        //         (product) =>
        //             product.productCatalog.includes(catalogTerm1) &&
        //             product.productName
        //                 .toLowerCase()
        //                 .split(" ")
        //                 .join("")
        //                 .includes(searchTerm.toLowerCase().split(" ").join(""))
        //     );
        //     return (
        //         <div className="for-respo-and-desktop-display">
        //             {filterdCatalogSearchProducts &&
        //                 filterdCatalogSearchProducts.length > 0 ? (
        //                 filterdCatalogSearchProducts.map((product) => (
        //                     <div className="StoreProductGridView">
        //                         <StoreSingleProduct
        //                             product={product}
        //                             storeDetails={store}
        //                         />
        //                     </div>
        //                 ))
        //             ) : (
        //                 <>
        //                     <div style={{ display: "flex", justifyContent: "center" }}>
        //                         <img
        //                             className="no-product-image-in-stroe-view-in-user-side"
        //                             src={ImportImage.NoProduct}
        //                             alt={"Shopisthan"}
        //                         />
        //                     </div>
        //                     <h2
        //                         style={{
        //                             color: "grey",
        //                             lineHeight: "2",
        //                             textAlign: "center",
        //                             padding: "10px 5px",
        //                             fontSize: "24px",
        //                         }}
        //                     >
        //                         Oooppss..! No Such Product found
        //                     </h2>
        //                 </>
        //             )}
        //         </div>
        //     );
        // }
    };

    return (
        <>
            <div className="Profile-profileContents-3cP">
                <div className="prfile-hg-pl-ui-neb-popop-csc">
                    <div className="new-filter-for-explore-store-only">
                        <div>
                            <div
                                tabIndex="0"
                                className="kfjfhurcncncbchn SearchTypeahead-isTypeaheadEnabled-3i3"
                            >
                                <div className="new-sesarch-compo-for-home-only-transparent">
                                    <div className="SearchTypeahead-searchIcon-1ld">
                                        <svg
                                            viewBox="0 0 12 12"
                                            className="search-svg-for-homepage-only"
                                        >
                                            <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        name="search"
                                        autocomplete="off"
                                        placeholder="Search by product name"
                                        aria-label="Search "
                                        className="homepage-input-for-search-only-catehry"
                                        style={{ outline: "none" }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Profile-tabs-DeN Profile-transitionBackwards-1fh">
                    {product && product.length > 0 ? renderProduct() : renderNoProducts("No Products on this store")}
                </div>
                <div className="floating-cart-inresponsive-view-instore-view">
                    <div className="floating-icon-of-category-in-resonsview">
                        <svg
                            onClick={() => {
                                setShowCatalogModal(true);
                            }}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            className="floatting-category-option-svg"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                stroke="none"
                            >
                                <path
                                    d="M752 4539 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
                                />
                                <path
                                    d="M2992 4539 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
                                />
                                <path
                                    d="M752 2299 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
                                />
                                <path
                                    d="M3475 2301 c-313 -80 -539 -291 -641 -601 -26 -79 -28 -96 -29 -255
0 -138 4 -182 19 -235 90 -309 317 -536 626 -626 53 -15 97 -19 235 -19 159 1
176 3 255 29 314 103 533 341 604 655 23 102 21 293 -4 401 -75 314 -336 575
-650 650 -112 26 -313 27 -415 1z"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="responsive-dashbord-view-block">
                <CatalogOptionsModal
                    show={showCatalogModal}
                    catalog={catalog}
                    onClose={() => setShowCatalogModal(false)}
                    selectedCatalog={selectedCatalog}
                />
            </div>
        </>
    );
};
