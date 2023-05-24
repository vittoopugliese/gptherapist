import {Button, Input} from "react-aria-components";
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
        {conversationSelected.content.length <= 0 && (
          <div style={{display: "flex", flexDirection: "row", gap: "1em"}}>
            <button
              className={`button-one ${
                rememberConversations && "button-selected"
              }`}
              onClick={() => setRememberConversations(true)}>
              Allow remember conversations! (expensive)
            </button>
            <button
              className={`button-one ${
                !rememberConversations && "button-selected"
              }`}
              onClick={() => setRememberConversations(false)}>
              Dont remember anything.
            </button>
          </div>
        )}

        <form className="form" onSubmit={promptTo}>
          <Input
            onChange={(e) => setUserMessage(e.target.value)}
            className="prompt-input"
            placeholder="Tell me about yourself, how are you?"
            value={userMessage}
          />

          <Button type="submit" className="prompt-button">
            <img
              src="https://www.svgrepo.com/show/510186/send-message.svg"
              className="sendArrow"
            />
          </Button>
        </form>
      </div>
    </>
  );
};
