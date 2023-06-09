import {useContext, useEffect, useState} from "react";
import {AppContext} from "./../../context/AppContext";
import {SidebarConversations} from "./SidebarConversations";
import { useDetectLocation } from "../../hooks/useDetectLocation";

const arrowSource = "https://www.svgrepo.com/show/511476/arrow-up-362.svg";
const upgradeImageSource = "https://www.svgrepo.com/show/341247/upgrade.svg";

export const SidebarMini = () => {
  const {state, dispatch, setSidebarMiniFunc, isMobile, setShowUpgradeModal, setConversationSelected} = useContext(AppContext);
  const [userAvatar, setUserAvatar] = useState('./unknown.png')
  const {user} = state
  const {navigate} = useDetectLocation()

  useEffect(() => {
    if (user.logged) {
      setUserAvatar(user.photoURL)
    }
  }, [user])
  
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
          <img src={userAvatar} onClick={() => navigate('/profile')}
          className="user-image" draggable={false} />
        </div>
      </div>
    </div>
  );
};
