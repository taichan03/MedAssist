import { logo } from "../assets";

const Header = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/taichan03")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        MedAssist: AI-powered Bipolar Medication{" "}
        <br className="max-md:hidden" />
        <span className="orange_gradient">Code for Philly</span>
      </h1>
      <h2 className="desc">
        MedAssist is an innovative AI-powered web application designed to assist
        psychiatrists in selecting the most appropriate bipolar medication for
        first-time patients. It is open-source and free to use. The app
        streamlines the medication decision-making process by leveraging
        advanced algorithms and comprehensive data analysis. It considers
        medication options and performs risk-benefit analyses based on the
        patient's diagnosis, symptom severity, treatment goals, and individual
        characteristics.
      </h2>
    </header>
  );
};

export default Header;
