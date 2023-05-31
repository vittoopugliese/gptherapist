import {useState, useReducer} from "react";
import {AppContext} from "./AppContext";
import {appReducer} from "./appReducer";
import {useMedia} from "../hooks/useMedia";

function initConversations() {
  const conversations = JSON.parse(localStorage.getItem("conversations"));
  return {conversations: conversations ? conversations : []};
}

function initConverSelected() {
  const conversationSelected = JSON.parse( localStorage.getItem("conversationSelected") );
  return conversationSelected ? conversationSelected : null;
}

function initSidebar() {
  const sidebar = JSON.parse(localStorage.getItem("sidebarMini"));
  return sidebar ? sidebar : false;
}

// AppProvider
export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer( appReducer, initConversations(), initConversations );
  const [conversationSelected, setConversationSelected] = useState(initConverSelected);

  const {isMobile} = useMedia();
  const [sidebarMini, setSidebarMini] = useState(initSidebar());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [promptSelected, setPromptSelected] = useState("therapist");
  const [rememberConversations, setRememberConversations] = useState(false);

  const [userTokens, setUserTokens] = useState(1000);

  function setSidebarMiniFunc() {
    setSidebarMini((s) => (s = !s));
    localStorage.setItem("sidebarMini", JSON.stringify(!sidebarMini));
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
