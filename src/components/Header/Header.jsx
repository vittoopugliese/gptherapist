import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import "./headerStyles.css";

export const Header = () => {
  const {userTokens, conversationSelected, isMobile} = useContext(AppContext);

  return (
    <header>
      <h1>My Therapist</h1>
      { (!isMobile) && <p>{conversationSelected?.title}</p> }
      <p>{userTokens} 🌌</p>
    </header>
  );
};
