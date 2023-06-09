import {useContext} from "react";
import {LoadingSpinner} from "./LoadingSpinner";
import { AppContext } from "../../context/AppContext";
import { useDetectLocation } from "../../hooks/useDetectLocation";

const chatImage = "chatavatar.png";
export const Message = ({msg}) => {
  const {state} = useContext(AppContext)
  const {user} = state
  const {navigate} = useDetectLocation()

  function parseOutput(message){
    let outputArray = message.split('```')
    const parsedmsg = `${outputArray[0]} ${outputArray[1]} ${outputArray[2]} ${outputArray[3]} ${outputArray[4]}`
    return parsedmsg.split('undefined')[0]
  }

  return (
    <>
      { (Boolean(msg)) &&
        <div className="conversation-content">
          <div className="message-container">
            <img className="message-image" src={user.photoURL} style={{cursor:'pointer'}}
            onClick={() => navigate('/profile')}
            alt={"chatImage"} draggable={false} />
            <p>{msg.input}</p>
          </div>

          {msg.output ? (
            <div className="message-container">
              <img className="message-image" src={chatImage} alt={"chatImage"} draggable={false} />
              <pre style={{
                fontFamily:'inherit',
                whiteSpace: "pre-wrap",
              }} >
                {parseOutput(msg.output)}
              </pre>
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
