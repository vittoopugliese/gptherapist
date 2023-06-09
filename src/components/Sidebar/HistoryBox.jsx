import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useAlert } from './../../hooks/useAlert';
import { useLocation, useNavigate } from "react-router-dom";

const chatImageSource = "https://www.svgrepo.com/show/510894/chat-remove.svg";
const trashImage = "https://www.svgrepo.com/show/505791/trash-2.svg";
const pencilImage = "https://www.svgrepo.com/show/500412/pencil.svg";
const checkImage = "https://www.svgrepo.com/show/490996/check.svg";
const selectedImageSource = "https://www.svgrepo.com/show/355189/radial-selected.svg";

// refactor the title edit function implemented in
// historybox and the chatbox title by moving
// functions to a useEditTitle hook...

export const HistoryBox = ({cnv}) => {
  const { state, dispatch, sidebarMini, isMobile,
  setConversationSelected, conversationSelected,
   removeAllConversAndSetNewState, langSelected, promptSelected} = useContext(AppContext);
  const [isHovering, setIsHovering] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isConverSelected, setIsConverSelected] = useState(false);

  useEffect(() => {
    // please explain this !!!
    localStorage.setItem("conversationSelected", JSON.stringify(cnv));
    localStorage.setItem("state", JSON.stringify(state));

    if (conversationSelected !== cnv) setIsConverSelected(true);
    return () => {
      if (conversationSelected !== cnv) setIsConverSelected(false);
    };

  }, [state, isEditing, conversationSelected, cnv]);


  const location = useLocation()
  const navigate = useNavigate()

  function selectedConver() {
    setConversationSelected(cnv)

    if(location.url !== 'chat' ) {
      navigate('chat')
    }
    
    localStorage.setItem("conversationSelected", JSON.stringify(cnv));
  }

  const {openAlert} = useAlert()

  function removeConversation(e) {
    let alertData = {
      title: `Delete <b>${cnv.title}</b>?`, 
      text: "Cannot undo this action.",
    }

    openAlert(alertData).then((result) => {
      if (result.isConfirmed) {
        e.stopPropagation();
        dispatch({type: "remove", payload: cnv.id});
        setConversationSelected(null);
        localStorage.removeItem("conversationSelected");
        if(state.conversations.length == 1){
          removeAllConversAndSetNewState()
        }
      }
    });
  }

  function openTitleInput() {
    setIsEditing(true);
    setInputValue(cnv.title);
  }

  function editTitle() {
    if(inputValue.length < 3) return
    setIsEditing(false);
    setIsHovering(false);
    cnv.title = inputValue;
  }

  function changeInput(e) {
    if (e.target.value.length > 20) return;
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") editTitle();
    if (e.key == "Escape") {
      setIsEditing(false);
      setIsHovering(false);
    }
  }

  return (
    <div
      onClick={selectedConver}
      onDoubleClick={(e) => removeConversation(e)}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className={`history-box ${(sidebarMini || isMobile) && "hb-mini"}`}>
      <img
        draggable={false}
        src={chatImageSource}
        style={{ filter: sidebarMini && !isConverSelected ? "invert(0.74) drop-shadow(0px 0px 5px #a0a0a0)" : "", }}
        className="history-chatLogo"
      />
      {!sidebarMini && !isMobile && !isEditing && <p>{cnv.title}</p>}

      {isEditing && (
        <div className="history-edit-container">
          <input
            type="text"
            autoFocus
            onFocus={(e) => e.target.select()}
            value={inputValue}
            onChange={changeInput}
            onKeyDown={handleKeyDown}
            className="history-title-input"
          />

          <img
            src={checkImage}
            alt="accept edit"
            onClick={editTitle}
            className="history-title-accept"
            style={{width:'1.54em'}}
          />
        </div>
      )}

      {isHovering && !isEditing && !sidebarMini && !isMobile && (
        <div className="box-tools">
          <img src={trashImage} alt="delete" onClick={removeConversation} />
          <img src={pencilImage} alt="edit" onClick={openTitleInput} />
        </div>
      )}

      {!isConverSelected && !isHovering && !sidebarMini && !isMobile && !isEditing && (
        <img
          src={selectedImageSource}
          alt="conversation selcted"
          className="box-selected"
        />
      )}
    </div>
  );
};
