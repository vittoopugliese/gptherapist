import {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import {signInWithGoogle} from "../firebase/providers";

const googleLogo = "https://www.svgrepo.com/show/475656/google-color.svg";

export const AuthPage = () => {
  const {state, dispatch, initUserState} = useContext(AppContext);
  // const {formState, onInputChange, onResetForm} = useForm();
  const [isRegistering, setIsRegistering] = useState(true);

  async function googleLogin(e) {
    e.preventDefault();
    const user = await signInWithGoogle();

    if (!user.ok) {
      return;
    }

    dispatch({type: "login", payload: user});
    initUserState()

    const updatedState = {
      conversations: state.conversations,
      user: {...user, logged: true},
    };

    localStorage.setItem("state", JSON.stringify(updatedState));
    localStorage.setItem("localUid", JSON.stringify(user.uid));
  }

  async function createAccount(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="auth-container">
        <h1>{isRegistering ? "Registering" : "Loggin"} into GPTherapist</h1>
        <form>
          <input type="text" name="username" placeholder="username" />
          <input type="email" name="email" placeholder="email" />
          {isRegistering && (
            <input type="password" name="password" placeholder="password" />
          )}
          <div className="buttons-container">
            <button className="login-button" onClick={(e) => createAccount(e)}>
              {isRegistering ? "Create Account" : "Login"}
            </button>
          </div>
          <div className="socialsLogin">
            <button className="login-button" onClick={(e) => googleLogin(e)}>
              <img src={googleLogo} alt="google login logo" draggable={false} />
            </button>
          </div>
          {isRegistering ? (
            <p onClick={() => setIsRegistering(false)}>
              Already registered? <b>Login...</b>
            </p>
          ) : (
            <p onClick={() => setIsRegistering(true)}>
              Not signed? <b>Create account</b>
            </p>
          )}
          currently only google regs/login is supported
        </form>
      </div>
    </>
  );
};
