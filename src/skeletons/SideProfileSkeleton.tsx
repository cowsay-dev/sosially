import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../stylesheets/Skeletons.css";

const SideProfileSkeleton = () => {
  return (
    <>
      <div className="side-profile-avatar">
        <Skeleton circle width={100} height={100} />
      </div>
      <div className="side-profile-text">
        <p>
          <Skeleton height={16} width={150} />
        </p>
        <p>
          <Skeleton height={16} width={100} />
        </p>
      </div>
    </>
  );
};

export default SideProfileSkeleton;
