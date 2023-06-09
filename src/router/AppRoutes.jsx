import {Navigate, Route, Routes} from "react-router-dom";
import {ChatPage} from "../pages/ChatPage";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {SidebarMini} from "../components/Sidebar/SidebarMini";
import {useContext, useEffect} from "react";
import {AppContext} from "./../context/AppContext";
import {Upgrade} from "../components/Upgrade/Upgrade";
import { OnPageLoad } from "../components/Misc/OnPageLoad";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { Header } from "react-aria-components";

export const AppRoutes = () => {
  const {state, sidebarMini, isMobile, showUpgradeModal, isLoading, setIsLoading} = useContext(AppContext);

  useEffect(() => {
    // temporal fuck
    setTimeout(()=>{ setIsLoading(false); }, 750)
  }, []);
  
  return (
    <>
   {isLoading && <OnPageLoad />}

    {(!isLoading && !state.user.logged) && <AuthPage />}

    {(!isLoading && state.user.logged) && 
    (<div className="AppContainer">
      {(!sidebarMini && !isMobile) ? <Sidebar /> : <SidebarMini />}
      <div className={`RoutesContainer ${ sidebarMini || isMobile ? "rc-toggled" : "" }`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
      {showUpgradeModal && <Upgrade />}
    </div>)}
    </>
  );
};
