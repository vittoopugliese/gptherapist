import {useContext, useEffect} from "react";
import {Header} from "../components/Header/Header";
import {AppContext} from "../context/AppContext";
import {useAlert} from "../hooks/useAlert";

const noChats = <h2 style={{marginTop: "0.6em"}}>Start a new conversation!</h2>;

export const ProfilePage = () => {
  const {state, userTokens, logOutAndRemoveState} = useContext(AppContext);
  const {user} = state;
  const {openAlert} = useAlert();

  function openChangeImage() {}

  function handleLogout() {
    openAlert({
      title: "Logout",
      text: "Its possible to (you will) loss data",
      confirmText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutAndRemoveState();
      }
    });
  }

  return (
    <>
      <div>
        <Header />
        <div className="profile-container">
          <div className="avatar-container">
            <img src={user.photoURL} alt="user photo url" />
            <p
              style={{fontSize: "0.6em", marginTop: "1em", cursor: "pointer"}}
              onClick={openChangeImage}>
              change image
            </p>
          </div>
          <div className="info">
            <p>{user.displayName}</p>
            <p style={{fontSize: "0.54em"}}>{user.email}</p>
          </div>
          <div className="credits">
            <p>{userTokens} 🌌</p>
          </div>
          <div className="logout">
            <button
              onClick={handleLogout}
              className="login-button"
              style={{ width: "unset", fontSize: "0.64em", padding: "0.4em 0.8em", }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
