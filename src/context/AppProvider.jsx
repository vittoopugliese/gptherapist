import {useState, useReducer, useEffect} from "react";
import {AppContext} from "./AppContext";
import {appReducer} from "./appReducer";
import {useMedia} from "../hooks/useMedia";
import {getUserState, saveUserState} from "../firebase/providers";
import {useDetectLocation} from "../hooks/useDetectLocation";

const emptyState = {
  conversations: [],
  user: {logged: false, uid: null, tokens: null},
};

function initState() {
  const localState = JSON.parse(localStorage.getItem("state"));
  if (localState) {
    return localState;
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
  const [state, dispatch] = useReducer(appReducer, emptyState, initState);
  const [conversationSelected, setConversationSelected] =
    useState(initConverSelected);
  const [intingConvers, setIntingConvers] = useState(true);

  const {isMobile} = useMedia();
  const [sidebarMini, setSidebarMini] = useState(initSidebar());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [promptSelected, setPromptSelected] = useState("therapist");
  const [rememberConversations, setRememberConversations] = useState(false);

  const [userTokens, setUserTokens] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const {detectLocationOf, navigate} = useDetectLocation();

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

          if (state.user.tokens) {
            setUserTokens(state.user.tokens);
          } else setUserTokens(1000);

          localStorage.setItem("state", JSON.stringify(state));
          setIntingConvers(false);
        } else {
          console.error(response.error);
          setIntingConvers(false);
          setUserTokens(1000);
        }
      });
      return;
    } else {
      setIntingConvers(false);
      console.error("no hay user state");
      setUserTokens(1000);
    }
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
    setUserTokens(null);
    setConversationSelected(null);
    localStorage.removeItem("state");
    localStorage.removeItem("localUid");
    localStorage.removeItem("conversationSelected");
    setIntingConvers(true);
  }

  function addNewConversation(converNumber) {
    let date = new Date().getTime();
    let conver = {
      title: `New conversation ${converNumber}`,
      id: date,
      content: [],
    };
    dispatch({type: "add", payload: conver});
    setConversationSelected(conver);

    detectLocationOf('/chat');
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

        addNewConversation,
      }}>
      {children}
    </AppContext.Provider>
  );
};
