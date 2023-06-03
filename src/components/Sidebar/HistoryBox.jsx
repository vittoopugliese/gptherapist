import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useAlert } from './../../hooks/useAlert';

const chatImageSource = "https://www.svgrepo.com/show/510894/chat-remove.svg";
const trashImage = "https://www.svgrepo.com/show/505791/trash-2.svg";
const pencilImage = "https://www.svgrepo.com/show/500412/pencil.svg";
const checkImage = "https://www.svgrepo.com/show/490996/check.svg";
const selectedImageSource = "https://www.svgrepo.com/show/355189/radial-selected.svg";

  // MASSIVE TODO:
// refactor the title edit function implemented in
// historybox and the chatbox title by moving
// functions to a useEditTitle hook...

export const HistoryBox = ({cnv}) => {
  const { state, dispatch, sidebarMini, isMobile, setConversationSelected, conversationSelected} = useContext(AppContext);
  const [isHovering, setIsHovering] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isConverSelected, setIsConverSelected] = useState(false);

  useEffect(() => {
    // please explain this !!!
    localStorage.setItem("conversationSelected", JSON.stringify(cnv));
    localStorage.setItem("conversations", JSON.stringify(state.conversations));
    
    if (conversationSelected !== cnv) setIsConverSelected(true);
    return () => {
      if (conversationSelected !== cnv) setIsConverSelected(false);
    };

  }, [state.conversations, isEditing, conversationSelected, cnv]);

  function selectedConver() {
    setConversationSelected(cnv);
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
          localStorage.removeItem("conversations");
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
      onDoubleClick={sidebarMini ? (e) => removeConversation(e) : undefined}
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
