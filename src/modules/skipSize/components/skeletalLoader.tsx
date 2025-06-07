import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletalLoader() {
    return (
        <div className="card col-md-3">
        <Skeleton height="200px" className="rounded-top" />
    
        <div className="card-body">
          <Skeleton  width="60%" className="mb-3" />
          <Skeleton className="mb-2" />
          <Skeleton width="80%" className="mb-2" />
          <Skeleton width="60%" className="mb-3" />
          <div className="d-flex gap-2">
            <Skeleton  />
            <Skeleton  />
          </div>
        </div>
      </div>
    );
  }