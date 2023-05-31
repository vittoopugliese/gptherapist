import React from "react";
import {Link} from "react-aria-components";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <header>
        <nav>
          <h1>My Therapist</h1>
          <div className="navItems">
            <a href="#">Chat</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="sideIcon">
            <img src="https://www.svgrepo.com/show/486704/info-feed.svg" />
          </div>
        </nav>
      </header>

      <main>
        <div className="main-header">
          <h2>Welcome to My Therapist</h2>
          <p>
            Experience the power of a custom therapist paying 10x less and with
            no time.
          </p>
        </div>
      </main>
    </div>
  );
};
