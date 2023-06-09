import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import "./chatboxStyles.css";
import {Prompt} from "./Prompt";
import {ConversationTitle} from "./ConversationTitle";
import {EmptyChatView} from "./EmptyChatView";
import {Chat} from "./Chat";

export const Chatbox = () => {
  const {conversationSelected, state} = useContext(AppContext);
  const [currentConversation, setCurrentConversation] = useState([]);
  const isEmptyChat = currentConversation.length === 0;

  function setMessage(e) {
    setCurrentConversation([...currentConversation, e]);
  }

  useEffect(() => {
    let filteredConver = conversationSelected.content.filter(
      (item) => item !== null
    );

    setCurrentConversation(filteredConver);
    localStorage.setItem("state", JSON.stringify(state));
  }, [state, conversationSelected]);

  return (
    <>
      <div className="chatbox">
        <div className="chat-container">
          {isEmptyChat && <EmptyChatView />}
          {currentConversation.length !== 0 && <ConversationTitle />}
          {currentConversation.length > 0 && <Chat currentConversation={currentConversation} />}
        </div>

        <Prompt setUserMessageFirst={(e) => setMessage(e)} />
      </div>
    </>
  );
};
