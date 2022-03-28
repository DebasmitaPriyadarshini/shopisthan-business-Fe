import "./Skeleton.css";

import React from "react";
import {
  // StoreProfileCardSkeleton,
  // StoreCategorySkeleton,
  // StoreSeachBarSkeleton,
  // StoreProductSingleSkeleton,
  StoreNavbarSkeleton,
  // StoreShareBoxSkeleton,
  // StoreOrderBoxSkeleton,
} from "../../Components/SkeletonComponents/StoreComponents";

const Skeleton = () => {
  return (
    <>
      {/* <StoreProfileCardSkeleton></StoreProfileCardSkeleton>
      <StoreCategorySkeleton></StoreCategorySkeleton>
      <StoreSeachBarSkeleton></StoreSeachBarSkeleton>
      <StoreProductSingleSkeleton></StoreProductSingleSkeleton> */}
      <StoreNavbarSkeleton></StoreNavbarSkeleton>
      {/* <StoreShareBoxSkeleton></StoreShareBoxSkeleton> */}
      {/* <StoreOrderBoxSkeleton></StoreOrderBoxSkeleton> */}
    </>
  );
};

export default Skeleton;
