import React from "react";
import {PromptSelector} from "./PromptSelector";

export const EmptyChatView = () => {
  return (
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
  );
};
