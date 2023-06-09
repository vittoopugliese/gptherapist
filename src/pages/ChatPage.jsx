import {useContext, useEffect} from "react";
import {Header} from "../components/Header/Header";
import {AppContext} from "../context/AppContext";
import {Chatbox} from "../components/Chatbox/Chatbox";
import {PromptSelector} from "../components/Chatbox/PromptSelector";

const noChats = <h2 style={{marginTop: "0.6em"}}>Start a new conversation!</h2>;

export const ChatPage = () => {
  const {conversationSelected} = useContext(AppContext);

  useEffect(() => {
    if (document.title && conversationSelected) {
      document.title = conversationSelected.title;

      return () => {
        if (document.title !== conversationSelected.title) {
          document.title = "GPTherapist";
        }
      };
    }
  }, [conversationSelected]);

  return (
    <>
      <div>
        <Header />
        <div className="chatpage-container">
          {conversationSelected ? <Chatbox /> : noChats}
        </div>
      </div>
    </>
  );
};
