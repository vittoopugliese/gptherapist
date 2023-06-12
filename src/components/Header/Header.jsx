import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {useAlert} from "./../../hooks/useAlert";
import { useDetectLocation } from './../../hooks/useDetectLocation';
import { LoadingSpinner } from './../Chatbox/LoadingSpinner';
import "./headerStyles.css";

export const Header = () => {
  const {userTokens, setUserTokens} = useContext(AppContext);
  const {openAlert} = useAlert();
  const {navigate} = useDetectLocation()

  function buyMoreTokens() {
    openAlert({
      title: "Buy More Tokens",
      text: "You can buy more tokens by clicking the button below.",
      cancelText: "Nel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open("https://mpago.la/1w34yyf", "_blank");
      }
    });
  }

  return (
    <header>
      <h1 onClick={() => navigate("/")}>My Therapist</h1>
      {  (userTokens || userTokens !== 0)
        ? <p onClick={buyMoreTokens}>{userTokens} 🌌</p>
        : <LoadingSpinner size={2} />
      }      
    </header>
  );
};
