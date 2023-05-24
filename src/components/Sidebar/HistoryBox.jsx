import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../context/AppContext";

const chatImageSource = "https://www.svgrepo.com/show/510894/chat-remove.svg";
const trashImage = "https://www.svgrepo.com/show/505791/trash-2.svg";
const pencilImage = "https://www.svgrepo.com/show/500412/pencil.svg";
const checkImage = "https://www.svgrepo.com/show/490996/check.svg";
const selectedImageSource =
  "https://www.svgrepo.com/show/355189/radial-selected.svg";

export const HistoryBox = ({cnv}) => {
  const { state, dispatch, sidebarMini, isMobile, setConversationSelected, conversationSelected, } = useContext(AppContext);
  const [isHovering, setIsHovering] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isConverSelected, setIsConverSelected] = useState(false);

  useEffect(() => {
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

  function removeConversation(e) {
    e.stopPropagation()
    dispatch({type:'remove', payload: cnv.id})
    setConversationSelected(null)
    localStorage.removeItem("conversationSelected", JSON.stringify(cnv));
  }

  function openTitleInput() {
    setIsEditing(true);
    setInputValue(cnv.title);
  }

  function editTitle() {
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
  }

  return (
    <div onClick={selectedConver}
      onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}
      className={`history-box ${(sidebarMini || isMobile) && "hb-mini"}`}>

      <img draggable={false} src={chatImageSource} 
      style={{filter: (sidebarMini && !isConverSelected) && 'invert(0.84)'}}
      className="history-chatLogo" />
      {!sidebarMini && !isMobile && !isEditing && <p>{cnv.title}</p>}

      {isEditing && (
        <div className="history-edit-container">
          <input type="text" autoFocus onFocus={(e) => e.target.select()} value={inputValue} onChange={changeInput} 
          onKeyDown={handleKeyDown} className="history-title-input" />

          <img src={checkImage} alt="accept edit" onClick={editTitle} 
          className="history-title-accept" />
        </div>
      )}

      {(isHovering && !isEditing && !sidebarMini) && (
        <div className="box-tools">
          <img src={trashImage} alt="delete" onClick={removeConversation} />
          <img src={pencilImage} alt="edit" onClick={openTitleInput} />
        </div>
      )}

      {(!isConverSelected && !isHovering && !sidebarMini) && (
        <img src={selectedImageSource} alt="conversation selcted" 
        className="box-selected" />
      )}
    </div>
  );
};
