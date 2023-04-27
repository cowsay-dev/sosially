import React from "react";
import Skeleton from "react-loading-skeleton";
import "../stylesheets/Skeletons.css";

const PostCardSkeleton = () => {
  return (
    <div className="pcs-main">
      <div className="pcs-uinfo-div">
        <Skeleton className="pcs-avatar" circle width={40} height={40} />
        <Skeleton className="pcs-name" width={150} height={30} />
      </div>
      <div className="pcs-img-div">
        <p>
          <Skeleton height={300} />
        </p>
      </div>
      <div className="pcs-last-div">
        <Skeleton height={30} width={150} />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
