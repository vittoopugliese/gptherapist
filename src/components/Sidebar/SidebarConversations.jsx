import {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContext";
import {HistoryBox} from "./HistoryBox";
import {AddConverButton} from "./AddConverButton";
import {LoadingSpinner} from "./../Chatbox/LoadingSpinner";

export const SidebarConversations = () => {
  const {state, intingConvers, initUserState, isMobile, sidebarMini} = useContext(AppContext);
  const {conversations} = state;

  useEffect(() => {
    if(!state){
      initUserState(state.user.uid)
    }
  }, []);

  return (
    <>
      {!intingConvers && <AddConverButton />}

      <div className="history-container">
        {intingConvers && (
          <div className="loading-container">
            {!isMobile && <p>Loading Conversations</p>}
            <LoadingSpinner mobile={isMobile} size={isMobile ? '2.6' : '4'} />
          </div>
        )}

        {!intingConvers &&
          conversations.map((cnvstn) => (
            <HistoryBox key={cnvstn.id} cnv={cnvstn} />
          ))}
        {
          (!intingConvers && conversations.length <= 0) && <p style={{rotate: sidebarMini ? '90deg' : '0deg'}} className="no-conver-text" >No conversations</p>
        }
      </div>
    </>
  );
};
