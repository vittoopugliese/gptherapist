import {useContext, useEffect} from "react";
import {LoadingSpinner} from "./LoadingSpinner";
import {AppContext} from "../../context/AppContext";

const userImage = "../../unknown.png";
const chatImage = "../../chatavatar.png";
export const Message = ({msg}) => {

  const {setShowPromptSelector} = useContext(AppContext);
  useEffect(() => {
    setShowPromptSelector(false);
  }, [msg?.output, setShowPromptSelector]);

  return (
    <>
      { (Boolean(msg)) &&
        <div className="conversation-content">
          <div className="message-container">
            <img
              className="message-image"
              src={userImage}
              alt={"chatImage"}
              draggable={false}
            />
            <p>{msg.input}</p>
          </div>

          {msg.output ? (
            <div className="message-container">
              <img
                className="message-image"
                src={chatImage}
                alt={"chatImage"}
                draggable={false}
              />
              <p>{msg.output}</p>
            </div>
          ) : (
            <div className="message-spinner-container">
              <LoadingSpinner />
            </div>
          )}
        </div>
      }
    </>
  );
};
