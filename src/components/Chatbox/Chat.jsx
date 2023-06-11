import React, {useContext, useEffect} from "react";
import {Message} from "./Message";
import {AppContext} from "../../context/AppContext";
import {saveUserState} from "../../firebase/providers";

export const Chat = ({currentConversation}) => {
  const {conversationSelected, state} = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    saveUserState(state.user.uid, state)
  }, [conversationSelected, state, currentConversation]);

  return (
    <div className="messages-container">
      {currentConversation.map((msg, i) => (
        <Message msg={msg} key={msg.id + (i + 1) * 2} />
      ))}
    </div>
  );
};
