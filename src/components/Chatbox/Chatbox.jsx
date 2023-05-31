import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Message} from "./Message";
import {Prompt} from "./Prompt";
import "./chatboxStyles.css";
import {PromptSelector} from "./PromptSelector";

export const Chatbox = () => {
  const {conversationSelected, dispatch, state} = useContext(AppContext);
  const [currentConversation, setCurrentConversation] = useState([]);
  const emptyChat = currentConversation.length === 0;

  function setMessage(e) {
    setCurrentConversation([...currentConversation, e]);
  }

  useEffect(() => {
    let filteredConver = conversationSelected.content.filter(
      (item) => item !== null
    );
    setCurrentConversation(filteredConver);
    localStorage.setItem("conversations", JSON.stringify(state.conversations));
  }, [state, conversationSelected]);

  return (
    <>
      <div className="chatbox">
        <div className="chatbox-container">
          {currentConversation.length !== 0 && (
            <div className="conver-title">
              <h2>{conversationSelected.title}</h2>
              <hr />
            </div>
          )}
          {currentConversation.length > 0 && (
            <div className="messages-container">
              {currentConversation.map((msg, i) => (
                <Message msg={msg} key={msg.id + (i + 1) * 2} />
              ))}
            </div>
          )}

          {emptyChat && (
            <div className="chat-into-container">
              <div>
                <h1 style={{margin: "0.4em 0em"}}>Welcome to your therapist</h1>
                <p>Enjoy talking with someone who really listens to you!</p>
              </div>
              <div>
                <p>First, select with who you want to talk and its memory...</p>
                <PromptSelector />
              </div>
            </div>
          )}
        </div>

        <Prompt setUserMessageFirst={(e) => setMessage(e)} />
      </div>
    </>
  );
};
