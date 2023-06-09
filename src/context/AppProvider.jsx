import {useState, useReducer} from "react";
import {AppContext} from "./AppContext";
import {appReducer} from "./appReducer";
import {useMedia} from "../hooks/useMedia";

function initState() {
  const state = JSON.parse(localStorage.getItem("state"));
  if(!state) return {conversations: [], user: {logged:false}}
  return state
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
  const [state, dispatch] = useReducer( appReducer, initState(), initState );
  const [conversationSelected, setConversationSelected] = useState(initConverSelected);

  const {isMobile} = useMedia();
  const [sidebarMini, setSidebarMini] = useState(initSidebar());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const [promptSelected, setPromptSelected] = useState("therapist");
  const [rememberConversations, setRememberConversations] = useState(false);
  
  const [userTokens, setUserTokens] = useState(1000);

  const [isLoading, setIsLoading] = useState(true);

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
        setRememberConversations,isLoading, setIsLoading
      }}>
      {children}
    </AppContext.Provider>
  );
};
