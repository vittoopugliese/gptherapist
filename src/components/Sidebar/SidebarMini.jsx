import React, {useContext} from "react";
import {AppContext} from "./../../context/AppContext";
import {SidebarConversations} from "./SidebarConversations";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const arrowSource = "https://www.svgrepo.com/show/511476/arrow-up-362.svg";
const upgradeImageSource = "https://www.svgrepo.com/show/341247/upgrade.svg";

export const SidebarMini = () => {
  const {setSidebarMiniFunc, isMobile, setShowUpgradeModal} = useContext(AppContext);
  const {user} = useContext(AuthContext)

  return (
    <div className="sidebar-container sb-toggled">
      {!isMobile && (
        <div className="sb-mini-header">
          <img
            onClick={setSidebarMiniFunc}
            className="arrow-icon ar-toggled"
            src={arrowSource}
            alt="arrow collapse"
          />
          <hr className="mini-hr" />
        </div>
      )}

      <div className="history-container sb-mini-convs"
        style={{marginTop: isMobile ? "0.54em" : "0em"}}>
        <SidebarConversations />
      </div>

      <div className="sb-mini-footer">
        <hr className="mini-hr" />
        <div className="upgrade-arrow-mini-cont" onClick={() => setShowUpgradeModal(s => !s)}>
          <img src={upgradeImageSource} className="upgrade-arrow" draggable={false} />
        </div>
        <div className="user-picture-mini-cont">
          <img src={user.avatar} className="user-image" draggable={false} />
        </div>
      </div>
    </div>
  );
};
