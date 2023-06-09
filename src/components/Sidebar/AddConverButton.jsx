import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useAlert } from "../../hooks/useAlert";
import { useDetectLocation } from '../../hooks/useDetectLocation';

const imageSource = "https://www.svgrepo.com/show/510786/add-plus-circle.svg";
const trashImage = "https://www.svgrepo.com/show/505791/trash-2.svg";

export const AddConverButton = () => {
  const {state, dispatch, isMobile, setConversationSelected, sidebarMini} =
    useContext(AppContext);
  const [converNumber, setConverNumber] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const {openAlert} = useAlert()

  const {detectLocationOf} = useDetectLocation()

  useEffect(() => {
    setConverNumber(state.conversations.length + 1);
  }, [state.conversations]);

  function handleConversations(e, action) {
    detectLocationOf('chat')

    e.stopPropagation();
    switch (action) {
      case "add": {
        let date = new Date().getTime();
        let conver = {
          title: `New conversation ${converNumber}`,
          id: date,
          content: [],
        };
        dispatch({type: "add", payload: conver});
        setConversationSelected(conver);
        break;
      }

      case "remove_all": {
        let alertData = {
          title: 'Remove all conversations?', 
        }

        openAlert(alertData).then(result => {
          if (result.isConfirmed) {
            dispatch({type: "remove_all"});
            localStorage.removeItem("conversations");
            localStorage.removeItem("conversationSelected");
            setConversationSelected(null);
          }
        });
        break;
      }

      default:
        break;
    }
  }

  function handleDoubleClick(e){
    if(sidebarMini){
      handleConversations(e, 'remove_all')
    }
  }

  return (
    <div onClick={(e) => handleConversations(e, "add")}
      className={`history-box addConver ${ (sidebarMini || isMobile) && "hb-mini" }`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onDoubleClick={(e) => handleDoubleClick(e)}>
      <img draggable={false} className="history-chatLogo" src={imageSource} style={{scale:'1.24'}}/>

      {(isHovering && !sidebarMini && !isMobile && state.conversations.length > 0) && (
        <div className="box-tools">
          <img src={trashImage} alt="delete" style={{marginRight: "6px"}} 
          onClick={(e) => handleConversations(e, "remove_all")} />
        </div>
      )}

      {!isMobile && !sidebarMini && <p>Start new conversation</p>}
    </div>
  );
};
