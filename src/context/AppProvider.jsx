import {useState, useReducer} from "react";
import {AppContext} from "./AppContext";
import {appReducer} from "./appReducer";
import {useMedia} from "../hooks/useMedia";

function initConversations() {
  const conversations = JSON.parse(localStorage.getItem("conversations"));
  return { conversations: conversations ? conversations : [] };
}

function initConverSelected() {
  const conversationSelected = JSON.parse(localStorage.getItem("conversationSelected"));
  return conversationSelected ? conversationSelected : null;
}
function initSidebar() {
  const sidebar = JSON.parse(localStorage.getItem("sidebarMini"));
  return sidebar ? sidebar : false;
}

function initPromptSelector() {
  const promptSelected = JSON.parse(localStorage.getItem("promptSelected"));
  return promptSelected ? promptSelected : "none";
}

// AppProvider
export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initConversations(), initConversations);
  const [sidebarMini, setSidebarMini] = useState(initSidebar());
  const {isMobile} = useMedia();
  const [showPromptSelector, setShowPromptSelector] = useState(true);
  const [promptSelected, setPromptSelected] = useState(initPromptSelector);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [conversationSelected, setConversationSelected] = useState(initConverSelected);
  
  const [userTokens, setUserTokens] = useState(200);
  const [rememberConversations, setRememberConversations] = useState(false);

  function setSidebarMiniFunc() {
    setSidebarMini((s) => (s = !s));
    localStorage.setItem("sidebarMini", JSON.stringify(sidebarMini));
  }

  function setPromptSelectedFunc(e) {
    setPromptSelected(e);
    localStorage.setItem("promptSelected", JSON.stringify(e));
  }
  
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isMobile,
        sidebarMini,
        setSidebarMiniFunc,
        showPromptSelector,
        setShowPromptSelector,
        promptSelected,
        setPromptSelectedFunc,
        showUpgradeModal,
        setShowUpgradeModal,
        
        conversationSelected,
        setConversationSelected,
        
        userTokens,
        setUserTokens,
        rememberConversations,
        setRememberConversations,
      }}>
      {children}
    </AppContext.Provider>
  );
};