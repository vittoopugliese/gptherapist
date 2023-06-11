import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useDetectLocation } from './../../hooks/useDetectLocation';

const upgradeImageSource = "https://www.svgrepo.com/show/341247/upgrade.svg";
const userDotsSource = "https://www.svgrepo.com/show/446646/three-dots-line.svg";

export const SidebarFooter = () => {

  const {state, setShowUpgradeModal} = useContext(AppContext)
  const {navigate} = useDetectLocation()
  const {user} = state

  return (
    <div className="sidebar-footer">
      <hr />
      <div className="upgrade-container" onClick={() => setShowUpgradeModal(s => !s)}>
        <img src={upgradeImageSource} className="upgrade-arrow" draggable={false} />
        <p>Upgrade to Pro</p>
        <p className="upgrade-new">NEW!</p>
      </div>

      <div className="user-container" onClick={() => navigate('/profile')}>
        <img src={user.photoURL} className="user-image" draggable={false} />
        <p>{user.displayName}</p>
        <div className="user-dots">
          <img src={userDotsSource} className="user-dots" draggable={false} />
        </div>
      </div>
    </div>
  );
};
