import React from "react";
import Skeleton from "react-loading-skeleton";

const UserProflieSkeleton = () => {
  return (
    <>
      <div className="user-profile-skeleton">
        <div className="user-profile-skeleton-detail" id="ups-1">
          <Skeleton height={52} width={64} />
        </div>
        <div className="user-profile-skeleton-avatar" id="ups-2">
          <Skeleton circle width={120} height={120} />
        </div>
        <div className="user-profile-skeleton-detail" id="ups-3">
          <Skeleton height={52} width={64} />
        </div>
      </div>
      <div className="user-profile-skeleton-name">
        <Skeleton height={20} width={150} />
      </div>
    </>
  );
};

export default UserProflieSkeleton;
