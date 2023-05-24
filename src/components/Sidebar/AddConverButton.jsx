import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import Swal from "sweetalert2";

const imageSource = "https://www.svgrepo.com/show/510786/add-plus-circle.svg";
const trashImage = "https://www.svgrepo.com/show/505791/trash-2.svg";

export const AddConverButton = () => {
  const {state, dispatch, isMobile, setConversationSelected, sidebarMini} =
    useContext(AppContext);
  const [converNumber, setConverNumber] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setConverNumber(state.conversations.length + 1);
  }, [state.conversations]);

  function handleConversations(e, action) {
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
        Swal.fire({
          title: "Remove all conversations?",
          showCancelButton: true,
          confirmButtonText: "Yeah",
          color: "#d4d4d4",
          background: "#242424",
          confirmButtonColor: "#747474",
          cancelButtonColor: "#424242",
        }).then((result) => {
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

  return (
    <div onClick={(e) => handleConversations(e, "add")}
      className={`history-box addConver ${ (sidebarMini || isMobile) && "hb-mini" }`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onDoubleClick={sidebarMini ? ((e) => handleConversations(e, 'remove_all')) : undefined}>
      <img draggable={false} className="history-chatLogo" src={imageSource} />

      {isHovering && !sidebarMini && (
        <div className="box-tools">
          <img src={trashImage} alt="delete"  style={{marginRight: "6px"}} 
          onClick={(e) => handleConversations(e, "remove_all")} />
        </div>
      )}

      {!isMobile && !sidebarMini && <p>Start new conversation</p>}
    </div>
  );
};
