import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from './../../context/AuthContext/AuthContext';

const upgradeImageSource = "https://www.svgrepo.com/show/341247/upgrade.svg";
const userDotsSource = "https://www.svgrepo.com/show/446646/three-dots-line.svg";

export const SidebarFooter = () => {

  const {setShowUpgradeModal} = useContext(AppContext)
  const {user} = useContext(AuthContext)

  return (
    <div className="sidebar-footer">
      <hr />
      <div className="upgrade-container" onClick={() => setShowUpgradeModal(s => !s)}>
        <img src={upgradeImageSource} className="upgrade-arrow" draggable={false} />
        <p>Upgrade to Pro</p>
        <p className="upgrade-new">NEW!</p>
      </div>

      <div className="user-container">
        <img src={user.avatar} className="user-image" draggable={false} />
        <p>Vittorio Pugliese</p>
        <div className="user-dots">
          <img src={userDotsSource} className="user-dots" draggable={false} />
        </div>
      </div>
    </div>
  );
};
