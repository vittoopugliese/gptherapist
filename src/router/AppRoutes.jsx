import {Navigate, Route, Routes} from "react-router-dom";
import {ChatPage} from "../pages/ChatPage";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {SidebarMini} from "../components/Sidebar/SidebarMini";
import {useContext, useEffect} from "react";
import {AppContext} from "./../context/AppContext";
import {Upgrade} from "../components/Upgrade/Upgrade";
import { LandingPage } from "../pages/LandingPage";
import { AuthContext } from './../context/AuthContext/AuthContext';
import { OnPageLoad } from "../components/Misc/OnPageLoad";

export const AppRoutes = () => {
  const {sidebarMini, isMobile, showUpgradeModal, isLoading, setIsLoading} = useContext(AppContext);
  const {isAuth} = useContext(AuthContext)

  useEffect(() => {
    // temporal fuck
    setTimeout(()=>{ setIsLoading(false); },250)
  }, []);
  
  return (
    <>
   {isLoading && <OnPageLoad />}
    {(!isLoading && isAuth) && 
    (<div className="AppContainer">
      {(!sidebarMini && !isMobile) ? <Sidebar /> : <SidebarMini />}
      <div className={`RoutesContainer ${ sidebarMini || isMobile ? "rc-toggled" : "" }`}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
      {showUpgradeModal && <Upgrade />}
    </div>)}

    {(!isLoading && !isAuth) && 
    (<div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>)}
    </>
  );
};
