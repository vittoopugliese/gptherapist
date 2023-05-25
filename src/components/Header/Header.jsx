import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import "./headerStyles.css";

export const Header = () => {
  const {userTokens} = useContext(AppContext);

  return (
    <header>
      <h1>My Therapist</h1>
      <p>{userTokens} 🌌</p>
    </header>
  );
};
