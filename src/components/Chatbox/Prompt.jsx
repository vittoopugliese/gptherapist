import {usePrompt} from "../../hooks/usePrompt";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export const Prompt = ({setUserMessageFirst, setFullMessage}) => {
  const {prompt, setUserMessage, userMessage} = usePrompt();
  const {
    dispatch,
    setConversationSelected,
    conversationSelected,
    rememberConversations,
    setRememberConversations,
  } = useContext(AppContext);

  async function promptTo(e) {
    e.preventDefault();
    if (userMessage.length < 3) return;

    // make user the input place first into chatbox
    setUserMessageFirst({
      input: userMessage,
      output: null,
      id: new Date().getTime(),
    });

    setUserMessage("");
    let messageRetrieved = await prompt();

    setConversationSelected((c) => {
      dispatch({
        type: "push_messages",
        payload: {conversationId: c.id, messages: messageRetrieved},
      });
      // setFullMessage(messageRetrieved)
      return {
        ...c,
        content: [...c.content, messageRetrieved],
      };
    });
  }

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", gap: "1em"}}>

        <form className="form" onSubmit={promptTo}>
          <input
            onChange={(e) => setUserMessage(e.target.value)}
            className="prompt-input"
            placeholder="Tell me about yourself, how are you?"
            value={userMessage}
          />

          <button type="submit" className="prompt-button">
            <img
              src="https://www.svgrepo.com/show/510186/send-message.svg"
              className="sendArrow"
            />
          </button>
        </form>
      </div>
    </>
  );
};
