import {Configuration, OpenAIApi} from "openai";
import {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import Swal from "sweetalert2";
import promptForms from "../static/promptForms";
import useAlert from "./useAlert";
import UseGetKey from "./useGetKey";

let promptDate = new Date();

export function usePrompt() {
  const [userMessage, setUserMessage] = useState("");
  const {promptSelected, userTokens, setUserTokens, rememberConversations, conversationSelected} = useContext(AppContext);
  const {openAlert} = useAlert()

  async function prompt() {
    if (userTokens <= 0) {
      setUserTokens(0);
      
      let alertData = {
        title: "You ran out of tokens!",
        text: "Please, buy a subscription or reload tokens to keep chatting!",
      }

      openAlert(alertData).then((result) => {
        if (result.isConfirmed) {
          // navigate to stripe? or /tokens
        }
      });

      return null;
    }

    let apikey = await UseGetKey();
    const openai = new OpenAIApi(new Configuration({apiKey: apikey}));
    let finalPrompt = promptForms.find((p) => p.form == promptSelected).prompt;
    // let maxTokens = (userTokens > 150) ? 150 : userTokens
    let maxTokens = 100
    let request;

    if (!rememberConversations) {
      request = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        max_tokens: maxTokens,
        messages: [{role: "user", content: `${finalPrompt} ${userMessage}`}],
      });
    } else {
      // have to remember all
      let allConversation
      if(conversationSelected.content.length <= 0){
        allConversation = userMessage
      } else {
        allConversation = obtenerConversacion(conversationSelected.content)
      }

      console.log(allConversation);

      request = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        max_tokens: maxTokens,
        messages: [{role: "user", content: `${finalPrompt} ${allConversation}`}],
      });
    }

    return await request.then((res) => {
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


function obtenerConversacion(conversacion) {
  let resultado = '';

  for (let i = 0; i < conversacion.length; i++) {
    const msg = conversacion[i];
    resultado += ` Mensaje ${i+1} del usuario: ` + msg.input + '\n';
    resultado += ` Mensaje ${i+1} del asistente: ` + msg.output + '\n';
  }

  return resultado;
}