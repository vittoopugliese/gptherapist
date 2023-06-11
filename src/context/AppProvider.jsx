import {useState, useReducer, useEffect} from "react";
import {AppContext} from "./AppContext";
import {appReducer} from "./appReducer";
import {useMedia} from "../hooks/useMedia";
import {getUserState, saveUserState} from "../firebase/providers";

const emptyState = {
  conversations: [],
  user: {logged: false, uid: null, tokens: 1000},
};

function initState() {
  const localUid = JSON.parse(localStorage.getItem("localUid"));
  if (localUid) {
    getUserState(localUid).then((response) => {
      if (response.ok) {
        const {state} = response;
        return state;
      } else {
        console.error(response.error);
        return emptyState;
      }
    });
  } else {
    return emptyState;
  }
}

function initConverSelected() {
  const conversationSelected = JSON.parse(
    localStorage.getItem("conversationSelected")
  );
  return conversationSelected ? conversationSelected : null;
}

function initSidebar() {
  const sidebar = JSON.parse(localStorage.getItem("sidebarMini"));
  return sidebar ? sidebar : false;
}

// AppProvider
export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, emptyState, initState());
  const [conversationSelected, setConversationSelected] =
    useState(initConverSelected);
  const [intingConvers, setIntingConvers] = useState(true);

  const {isMobile} = useMedia();
  const [sidebarMini, setSidebarMini] = useState(initSidebar());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [promptSelected, setPromptSelected] = useState("therapist");
  const [rememberConversations, setRememberConversations] = useState(false);

  const [userTokens, setUserTokens] = useState();

  const [isLoading, setIsLoading] = useState(true);

  function setSidebarMiniFunc() {
    setSidebarMini((s) => (s = !s));
    localStorage.setItem("sidebarMini", JSON.stringify(!sidebarMini));
  }

  function setPromptSelectedFunc(e) {
    setPromptSelected(e);
    localStorage.setItem("promptSelected", JSON.stringify(e));
  }

  function initUserState() {
    setIntingConvers(true);
    if (state.user.uid) {
      getUserState(state.user.uid).then((response) => {
        if (response.ok) {
          const {state} = response;
          dispatch({type: "init_state", payload: state});
          setIntingConvers(false);
        } else {
          console.error(response.error);
          setIntingConvers(false);
        }
      });
      return;
    }
    setIntingConvers(false);
    console.error("no hay user state");
  }

  function removeAllConversAndSetNewState() {
    dispatch({type: "remove_all"});
    setConversationSelected(null);
    localStorage.removeItem("conversationSelected");
    const preState = {...state, conversations: []};
    localStorage.setItem("state", JSON.stringify(preState));
    saveUserState(state.user.uid, preState);
  }

  function logOutAndRemoveState() {
    dispatch({type: "logout"});
    setConversationSelected(null);
    localStorage.removeItem("state");
    localStorage.removeItem("localUid");
    localStorage.removeItem("conversationSelected");
    setIntingConvers(true);
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
        isLoading,
        setIsLoading,
        intingConvers,
        setIntingConvers,
        initUserState,
        removeAllConversAndSetNewState,
        logOutAndRemoveState,
      }}>
      {children}
    </AppContext.Provider>
  );
};
