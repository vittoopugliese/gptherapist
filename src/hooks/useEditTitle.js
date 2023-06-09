import {useContext, useEffect, useState} from "react";
import { AppContext } from "../context/AppContext";

export function useEditTitle(cnv) {
  const {conversationSelected, state} = useContext(AppContext)
  const [isHovering, setIsHovering] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const pencilImage = "https://www.svgrepo.com/show/500412/pencil.svg";
  const checkImage = "https://www.svgrepo.com/show/490996/check.svg";

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
  }

  return {
    openTitleInput,
    editTitle,
    changeInput,
    handleKeyDown,
    setIsHovering,
    isEditing,
    isHovering,
    inputValue,
    pencilImage,
    checkImage,
    
  };
}
