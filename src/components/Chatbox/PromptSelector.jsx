import {useContext, useEffect} from "react";
import {AppContext} from "../../context/AppContext";

export const PromptSelector = () => {
  const {promptSelected, setPromptSelectedFunc, rememberConversations, setRememberConversations} = useContext(AppContext);

  return (
    <>
    <div className="prompt-configs-container">
      <div className="prompt-selector-container">
        <button className={`button-one ${ promptSelected == "therapist" && "button-selected" }`} onClick={() => setPromptSelectedFunc("therapist")}> therapist </button>
        <button className={`button-one ${ promptSelected == "code_expert" && "button-selected" }`} onClick={() => setPromptSelectedFunc("code_expert")}> code expert </button>
        <button className={`button-one ${ promptSelected == "none" && "button-selected" }`} onClick={() => setPromptSelectedFunc("none")}> none </button>
      </div>
      <div className="prompt-selector-container ">
        <button className={`button-one ${ rememberConversations && "button-selected" }`} onClick={() => setRememberConversations(true)}>Remember Chats! (expensive) </button>
        <button className={`button-one ${ !rememberConversations && "button-selected" }`} onClick={() => setRememberConversations(false)}> Dont rememeber anything. </button>
      </div>
    </div>
    </>
  );
};
