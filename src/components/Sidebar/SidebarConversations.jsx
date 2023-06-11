import {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContext";
import {HistoryBox} from "./HistoryBox";
import {AddConverButton} from "./AddConverButton";
import {LoadingSpinner} from "./../Chatbox/LoadingSpinner";

export const SidebarConversations = () => {
  const {state, intingConvers, initUserState} = useContext(AppContext);
  const {conversations} = state;

  useEffect(() => {
    initUserState()
  }, []);

  return (
    <>
      {!intingConvers && <AddConverButton />}

      <div className="history-container">
        {intingConvers && (
          <div className="loading-container">
            <p>Loading Conversations</p>
            <LoadingSpinner size={"4"} />
          </div>
        )}

        {!intingConvers &&
          conversations.map((cnvstn) => (
            <HistoryBox key={cnvstn.id} cnv={cnvstn} />
          ))}

        {
          (!intingConvers && conversations.length <= 0) && <p style={{textAlign:'center',marginTop:'1em', fontSize:'0.8em'}}>No conversations</p>
        }
      </div>
    </>
  );
};
