import {useContext, useEffect} from "react";
import {Header} from "../components/Header/Header";
import {AppContext} from "../context/AppContext";
import {Chatbox} from "../components/Chatbox/Chatbox";
import {PromptSelector} from "../components/Chatbox/PromptSelector";

const noChats = (
  <h2 style={{marginTop: "0.6em"}}>
    Start a new conversation!
  </h2>
);

export const ChatPage = () => {
  const {showPromptSelector, conversationSelected} = useContext(AppContext);
  const showPSelector = (showPromptSelector && conversationSelected 
    && conversationSelected.content.length <= 0)

  return (
    <>
      <div>
        <Header />
        <div
          className="chatpage-container"
          style={{
            height: showPromptSelector
              ? "calc(100vh - 100px)"
              : "calc(100vh - 54px)",
          }}>
          {conversationSelected ? <Chatbox /> : noChats}
        </div>

        {showPSelector && <PromptSelector />}
      </div>
    </>
  );
};
