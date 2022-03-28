import React, { useState } from "react";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import "./style.css";
import { BottomNavigationProfile } from "../../Components/BottomNavigation";
import { SampleStoreView } from "../../Components/SampleStoreComponents/storeview";
import { SampleStoreViewProductSide } from "../../Components/SampleStoreComponents/productview";


export const SampleStore = (props) => {

    const { storeCategory } = props.match.params;
    const storeLists = useSelector((state) => state.sampleData.sampleStores);
    const storeDetails = storeLists && storeLists.length > 0 ?
        storeLists.filter((store) => store.storeCategory.toLowerCase().split(" ").join("-") === storeCategory)
        : null
    const store = storeDetails && storeDetails.length > 0 ? storeDetails[0] : null;

    const productLists = useSelector((state) => state.sampleData.sampleProducts);
    const catalogLists = useSelector((state) => state.sampleData.sampleCatalogs);

    const product = store && productLists && productLists.length > 0 ? productLists.filter((product) => product.storeId = store._id) : [];
    const catalog = store && catalogLists && catalogLists.length > 0 ? catalogLists.filter((catalog) => catalog.storeId = store._id) : [];




    const [catalogTerm, setCatalogTerm] = useState("");



    const onCatalogChange = (val) => {
        if (val === "All") {
            return setCatalogTerm("");
        } else {
            return setCatalogTerm(val);
        }
    };

    const catalogArray = [];

    function insertObject(arr, obj) {
        arr.push(obj);
    }

    var arrayLength = catalog ? catalog.length : 0;
    for (var i = 0; i < arrayLength; i++) {
        const noOfProductsInCatalog = product.filter(
            (product) => product.productCatalog === catalog[i]._id
        ).length;
        const object = {
            _id: catalog[i]._id,
            name: catalog[i].name,
            totalProducts: noOfProductsInCatalog,
        };
        insertObject(catalogArray, object);
    }

    const renderNoOfProductsInCatalog = (catalogId) => {
        if (product && product.length === 0) {
            return 0;
        } else {
            const noOfProductsInCatalog = product.filter(
                (product) => product.productCatalog === catalogId
            ).length;
            return noOfProductsInCatalog;
        }
    };
    const renderCatalogList = () => {
        return (
            <>
                <div
                    className="category-name-in-store-view-all-category"
                    onClick={() => setCatalogTerm("")}
                >
                    All
                </div>
                {catalogArray && catalogArray.length > 0
                    ? catalogArray
                        .sort((a, b) => b.totalProducts - a.totalProducts)
                        .map((catalog, index) => (
                            <h3
                                className="category-name-in-store-view-all-category"
                                onClick={() => setCatalogTerm(catalog._id)}
                                key={index}
                            >
                                {catalog.name} ({renderNoOfProductsInCatalog(catalog._id)})
                            </h3>
                        ))
                    : null}
            </>
        );
    };

    return (
        <>
            <>
                <Helmet>
                    <title>
                        {" "}
                        {store && store.storeName ? store.storeName : "Shopisthan"} Now
                        Online
                    </title>
                    <meta
                        name="description"
                        content="Place your Orders from your favorite Store {{Store Name}} Now. Check our Products and start your shopping"
                    />
                </Helmet>
                <div className="dashboard-destop-view-only">
                    <div>
                        {/* <StoreNavBar
                            store={store}

                        /> */}
                    </div>
                </div>
                <div id="top-panel" className="slide-panel js-top-panel">
                    <div
                        tabIndex="0"
                        id="site-content"
                        className="js-site-content site-content e2e-site-conten"
                    >
                        <div className="Profile-root-3Ir Profile-bannerEmpty-3ep e2e-Profile-page-container">
                            <div className="Profile-wrap-3mj">
                                {/* <StoreViewProfileCard store={store} /> */}
                                <SampleStoreView store={store} />
                                <SampleStoreViewProductSide
                                    product={product}
                                    store={store}
                                    catalog={catalogArray}
                                    catalogTerm1={catalogTerm}
                                    onCatalogChange={onCatalogChange}
                                />
                                {/* <StoreViewProductSide
                           
                                /> */}
                                <div className="category-bax-in-store-view">
                                    <div className="new-category-tag-up-niceakj">
                                        {store && store.storeName ? store.storeName : "Store"}{" "}
                                        Catalog
                                    </div>
                                    <div className="all-categoryl-lis-xneo">
                                        {renderCatalogList()}
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="responsive-dashbord-view-block">
                    <BottomNavigationProfile
                        storeUrl={props.match.params}
                        store={true}
                    />
                </div>
            </>
        </>
    );
};
