import React, { useContext } from "react";
import {Header} from "../components/Header/Header";
import { AppContext } from "../context/AppContext";

const arrowLeft = "https://www.svgrepo.com/show/507493/arrow-left-circle.svg";

export const HomePage = () => {

  const {addNewConversation} = useContext(AppContext)
  return (
    <div className="landing-container">
      <Header />
      <main>
        <div className="main-header">
          <h1>Welcome to GPTherapist</h1>
          <p>
            Experience the power of a custom therapist paying 10x less and with
            no time barriers.
          </p>
        </div>
        <div className="start-chatting" onClick={() => addNewConversation(':D')}>
          <img
            src={arrowLeft}
            alt="start chatting"
            style={{width: "30px", filter: "invert(1)"}}
          />
          <p>start chatting!</p>
        </div>
      </main>
    </div>
  );
};
