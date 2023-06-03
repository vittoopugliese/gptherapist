import React from "react";
import {LoadingSpinner} from "./../Chatbox/LoadingSpinner";
import "./miscStyles.css";
export const OnPageLoad = () => {
  return (
    <>
      <div className="page-load-content">
        <h1>My Therapist</h1>
        <div className="loadem">
          <LoadingSpinner size="6" />
        </div>
      </div>
    </>
  );
};
