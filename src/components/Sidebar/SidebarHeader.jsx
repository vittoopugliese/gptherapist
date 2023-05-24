import React, {useContext} from "react";
import {AppContext} from "./../../context/AppContext";

const arrowSource = "https://www.svgrepo.com/show/511476/arrow-up-362.svg";

export const SidebarHeader = () => {
  const {setSidebarMiniFunc} = useContext(AppContext);

  return (
    <div>
      <div className="chat-history">
        <h2>Chat History</h2>
        <img
          onClick={setSidebarMiniFunc}
          className="arrow-icon"
          src={arrowSource}
          alt="arrow collapse"
        />
      </div>
      <hr />
    </div>
  );
};
