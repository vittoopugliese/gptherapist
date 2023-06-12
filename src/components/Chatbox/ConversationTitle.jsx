import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";

const checkImage = "https://www.svgrepo.com/show/490996/check.svg";
// MASSIVE TODO:
// refactor the title edit function implemented in
// historybox and the chatbox title by moving
// functions to a useEditTitle hook...
export const ConversationTitle = () => {
  const {conversationSelected, dispatch, state} = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    document.title = inputValue;
  }, [state, conversationSelected]);

  function openTitleInput() {
    setIsEditing(true);
    setInputValue(conversationSelected.title);
  }

  function editTitle() {
    if (inputValue.length < 3) return;
    setIsEditing(false);
    conversationSelected.title = inputValue;
    dispatch({type: "reload_title", payload: conversationSelected});
  }

  function changeInput(e) {
    if (e.target.value.length > 20) return;
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") editTitle();
    if (e.key == "Escape") {
      setIsEditing(false);
    }
  }

  return (
    <div className="conver-title">
      {!isEditing && (
        <h2 onDoubleClick={openTitleInput}
        >{conversationSelected.title}</h2>
      )}

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
            style={{
              height: "46px",
              width: "74%",
              textAlign: "center",
              fontSize: "1.54em",
            }}
          />

          <img
            src={checkImage}
            alt="accept edit"
            onClick={editTitle}
            className="history-title-accept"
            style={{width: "2.54em"}}
          />
        </div>
      )}

      <hr />
    </div>
  );
};
