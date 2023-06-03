import {useContext, useEffect} from "react";
import {LoadingSpinner} from "./LoadingSpinner";
import { AuthContext } from './../../context/AuthContext/AuthContext';

const chatImage = "chatavatar.png";
export const Message = ({msg}) => {
  const {user} = useContext(AuthContext);

  return (
    <>
      { (Boolean(msg)) &&
        <div className="conversation-content">
          <div className="message-container">
            <img className="message-image" src={user.avatar} alt={"chatImage"} draggable={false} />
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
