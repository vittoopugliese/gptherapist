import React, {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContext";
import {HistoryBox} from "./HistoryBox";
import { AddConverButton } from "./AddConverButton";

export const SidebarConversations = () => {
  const {state} = useContext(AppContext);
  const {conversations} = state;

  return (
    <>
      <AddConverButton />
      <div className="history-container">
        {conversations.map((cnvstn) => (
          <HistoryBox key={cnvstn.id} cnv={cnvstn} />
        ))}
      </div>
    </>
  );
};
