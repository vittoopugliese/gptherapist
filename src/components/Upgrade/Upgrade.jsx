import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import "./upgradeStyles.css";
import { Link } from "react-router-dom";

const checkImageSource = "https://www.svgrepo.com/show/507980/check-badge.svg";
const crossImageSource =
  "https://www.svgrepo.com/show/510786/add-plus-circle.svg";

export const Upgrade = () => {
  const {setShowUpgradeModal} = useContext(AppContext);

  return (
    <>
      <div
        className="upgradeplan-container-bg"
        onClick={() => setShowUpgradeModal((s) => !s)}></div>

      <div className="upgradeplan-container">
        <div className="upgradeplan-header">
          <h3>Plan settings</h3>
          <img
            src={crossImageSource}
            className="cross-close-modal"
            alt="cross close modal"
            onClick={() => setShowUpgradeModal((s) => !s)}
          />
        </div>

        <div className="upgradeplan-content">
          <div className="plan-container">
            <h2 className="plan-title">Free Plan</h2>
            <button>Your current plan</button>
            <div className="perks-container">
              <div className="perk">
                <img src={checkImageSource} alt="upgrade check" />
                <p>Available when demand is low</p>
              </div>
              <div className="perk">
                <img src={checkImageSource} alt="upgrade check" />
                <p>Standard response speed</p>
              </div>
              <div className="perk">
                <img src={checkImageSource} alt="upgrade check" />
                <p>Regular model updates</p>
              </div>
            </div>
          </div>

          <div className="plan-container">
            <div className="title-price-container">
              <h2 className="plan-title">Therapist Pro</h2>
              <h2 className="plan-price">USD $10/mo</h2>
            </div>
            <button>Upgrade plan</button>
            <div className="perks-container">
              <div className="perk">
                <img
                  src={checkImageSource}
                  className="perk-color"
                  alt="upgrade check"
                />
                <p>Available when demand is high</p>
              </div>
              <div className="perk">
                <img
                  src={checkImageSource}
                  className="perk-color"
                  alt="upgrade check"
                />
                <p>Faster response speed</p>
              </div>
              <div className="perk">
                <img
                  src={checkImageSource}
                  className="perk-color"
                  alt="upgrade check"
                />
                <p>Priority access to new features</p>
              </div>
            </div>
            <div className="charge-credits">
            <p>Or simply <Link to='/credits'><b>reload your credits</b></Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
