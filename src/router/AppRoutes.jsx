import {Navigate, Route, Routes} from "react-router-dom";
import {ChatPage} from "../pages/ChatPage";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {SidebarMini} from "../components/Sidebar/SidebarMini";
import {useContext} from "react";
import {AppContext} from "./../context/AppContext";
import {Upgrade} from "../components/Upgrade/Upgrade";
import { LandingPage } from "../pages/LandingPage";
import { AuthContext } from './../context/AuthContext/AuthContext';

export const AppRoutes = () => {
  const {sidebarMini, isMobile, showUpgradeModal} = useContext(AppContext);
  const {isAuth} = useContext(AuthContext)
  return (
    <>
    {isAuth && 
    (<div className="AppContainer">
      {(!sidebarMini && !isMobile) ? <Sidebar /> : <SidebarMini />}
      <div className={`RoutesContainer ${ sidebarMini || isMobile ? "rc-toggled" : "" }`}>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/*" element={<Navigate to={"/chat"} />} />
        </Routes>
      </div>
      {showUpgradeModal && <Upgrade />}
    </div>)}

    {!isAuth && 
    (<div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>)}
    </>
  );
};
