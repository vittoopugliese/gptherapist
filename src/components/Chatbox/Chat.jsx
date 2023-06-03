import React, {useContext, useEffect} from "react";
import {Message} from "./Message";
import {AppContext} from "../../context/AppContext";

export const Chat = ({currentConversation}) => {
  const {conversationSelected, state} = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(state.conversations));
  }, [conversationSelected, state.conversations, currentConversation]);

  return (
    <div className="messages-container">
      {currentConversation.map((msg, i) => (
        <Message msg={msg} key={msg.id + (i + 1) * 2} />
      ))}
    </div>
  );
};
