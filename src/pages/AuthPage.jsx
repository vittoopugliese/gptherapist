import {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import {signInWithGoogle} from "../firebase/providers";

const googleLogo = "https://www.svgrepo.com/show/475656/google-color.svg";

export const AuthPage = () => {
  const {state, dispatch, initUserState} = useContext(AppContext);
  // const {formState, onInputChange, onResetForm} = useForm();

  async function googleLogin(e) {
    e.preventDefault();
    const user = await signInWithGoogle();
    if (!user.ok) return;

    dispatch({type: "login", payload: user});
    initUserState(user.uid);

    const updatedState = {
      conversations: state.conversations,
      user: {...user, logged: true},
    };

    localStorage.setItem("state", JSON.stringify(updatedState));
  }

  async function createAccount(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="auth-container">
        <h1>Entering GPTherapist</h1>
        <div className="socialsLogin">
          <button className="login-button" onClick={(e) => googleLogin(e)}>
            <img src={googleLogo} alt="google login logo" draggable={false} />
          </button>
        </div>
        <p style={{fontSize:'0.8em'}}>only login/register with google available for now</p>
      </div>
    </>
  );
};
