import React from "react";

import "./LoadingIndicator.scss";

const LoadingIndicator = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="loading-indicator-container">
        <div className="loading-indicator"></div>
      </div>
    );
  }
  return null;
};

export default LoadingIndicator;
