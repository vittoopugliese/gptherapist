import {useContext} from "react";
import {LoadingSpinner} from "./LoadingSpinner";
import { AppContext } from "../../context/AppContext";

const chatImage = "chatavatar.png";
export const Message = ({msg}) => {
  const {state} = useContext(AppContext)
  const {user} = state

  return (
    <>
      { (Boolean(msg)) &&
        <div className="conversation-content">
          <div className="message-container">
            <img className="message-image" src={user.photoURL} alt={"chatImage"} draggable={false} />
            <p>{msg.input}</p>
          </div>

          {msg.output ? (
            <div className="message-container">
              <img className="message-image" src={chatImage} alt={"chatImage"} draggable={false} />
              <p>{msg.output}</p>
            </div>
          ) : (
            <div className="message-spinner-container">
              <LoadingSpinner size='3.8'/>
            </div>
          )}
        </div>
      }
    </>
  );
};
