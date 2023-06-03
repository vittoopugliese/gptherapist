import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import "./headerStyles.css";
import {useAlert} from "./../../hooks/useAlert";

export const Header = () => {
  const {userTokens} = useContext(AppContext);
  const {openAlert} = useAlert();

  function buyMoreTokens() {
    openAlert({
      title: "Buy More Tokens",
      text: "You can buy more tokens by clicking the button below.",
      cancelText: 'Nel'
    }).then((result) => {
      if (result.isConfirmed) {
        window.open("https://mpago.la/1w34yyf", "_blank");
      }
    });
  }

  return (
    <header>
      <h1>My Therapist</h1>
      <p onClick={buyMoreTokens}>{userTokens} 🌌</p>
    </header>
  );
};
