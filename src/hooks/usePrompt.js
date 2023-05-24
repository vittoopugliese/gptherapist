import {Configuration, OpenAIApi} from "openai";
import {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import Swal from "sweetalert2";
import promptForms from "../static/promptForms";
import UseGetKey from './useGetKey'

let promptDate = new Date();

export function usePrompt() {
  const [userMessage, setUserMessage] = useState("");
  const {
    promptSelected,
    userTokens,
    setUserTokens,
    rememberConversations,
    setRememberConversations,
  } = useContext(AppContext);
  
  
  
  async function prompt() {
    let apikey = await UseGetKey()
    if (userTokens <= 0) {
      setUserTokens(0);
      Swal.fire({
        title: "You ran out of tokens!",
        text: "Please, buy a subscription or reload tokens to keep chatting!",
        showCancelButton: true,
        confirmButtonText: "Yeah",
        color: "#d4d4d4",
        background: "#242424",
        confirmButtonColor: "#747474",
        cancelButtonColor: "#424242",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate to stripe? or to /tokens
        }
      });

      return null;
    }

    const openai = new OpenAIApi(new Configuration({apiKey: apikey}));

    // if (!rememberConversations) {
    //   first fetch code
    // } else {
    //   have to remember all messages
    // }

    let finalPrompt = promptForms.find((p) => p.form == promptSelected).prompt;

    return await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        max_tokens: userTokens,
        messages: [{role: "user", content: `${finalPrompt} ${userMessage}`}],
      })
      .then((res) => {
        // user_tokens
        setUserTokens((ut) => Math.max(ut - res.data.usage.total_tokens, 0));

        let newMessage = {
          input: userMessage,
          output: res.data.choices[0].message.content,
          id: promptDate.getTime(),
        };
        return newMessage;
      });
  }

  return {prompt, userMessage, setUserMessage};
}
