import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import promptForms from "../../static/promptForms";

export const LangSelector = () => {
  const {langSelected, setLangSelected, promptSelected} =
    useContext(AppContext);

  return (
    <div className="lang-selector">
      <button
        type="submit"
        onClick={() => setLangSelected("es")}
        className={`button-one flag ${
          langSelected == "es" && "button-selected"
        }`}>
        <img
          src="https://flagicons.lipis.dev/flags/4x3/es.svg"
          alt="united states flag"
        />
      </button>
      <button
        type="submit"
        onClick={() => setLangSelected("en")}
        className={`button-one flag ${
          langSelected == "en" && "button-selected"
        }`}>
        <img
          src="https://flagicons.lipis.dev/flags/4x3/um.svg"
          alt="spain flash"
        />
      </button>

      {/* <input
        onChange={(e) => setinputValue(e.target.value)}
        className="prompt-input"
        placeholder="Tell me about yourself, how are you?"
        value={promptForms[langSelected][2].prompt}
      /> */}
    </div>
  );
};
