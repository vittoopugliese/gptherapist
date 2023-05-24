import {Navigate, Route, Routes} from "react-router-dom";
import {ChatPage} from "../pages/ChatPage";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {SidebarMini} from "../components/Sidebar/SidebarMini";
import {useContext} from "react";
import {AppContext} from "./../context/AppContext";
import {Upgrade} from "../components/Upgrade/Upgrade";

export const AppRoutes = () => {
  const {sidebarMini, isMobile, showUpgradeModal} = useContext(AppContext);

  return (
    <div className="AppContainer">
      {!sidebarMini && !isMobile ? <Sidebar /> : <SidebarMini />}
      <div className={`RoutesContainer ${ sidebarMini || isMobile ? "rc-toggled" : "" }`}>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/*" element={<Navigate to={"/chat"} />} />
        </Routes>
      </div>
      {showUpgradeModal && <Upgrade />}
    </div>
  );
};
