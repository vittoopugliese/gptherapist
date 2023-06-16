import { useContext, useEffect } from "react";
import {PromptSelector} from "./PromptSelector";
import {LangSelector} from "./LangSelector";
import { AppContext } from "../../context/AppContext";

export const EmptyChatView = () => {
  const {langSelected, promptSelected} = useContext(AppContext);

  useEffect(() => {

  }, [langSelected, promptSelected])
  

  return (
    <div className="chat-into-container">
      <div>
        <h1 className="welcomeh1" style={{margin: "0.4em 0em"}}>
          Welcome to your therapist
        </h1>
        <p>Enjoy talking with someone who really listens to you!</p>
      </div>
      <div>
        <div>
          <p> First! You have to choose what language will be this conversation </p>
          <LangSelector />
        </div>
        <div>
          <p>And then select with who you want to talk and its memory...</p>
          <PromptSelector />
        </div>
      </div>
    </div>
  );
};
