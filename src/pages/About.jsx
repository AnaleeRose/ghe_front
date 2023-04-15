import { createContext } from 'react';
import { Helmet } from "react-helmet";
import { Header } from "../components/Header.jsx"
import { HeadingBlurb } from "../components/HeadingBlurb.jsx"
import '../styles/styles.scss';
const PageName = createContext("about");

export function About() {
  console.log("REACT_APP_BACKEND_URL:" + process.env.REACT_APP_BACKEND_URL)
  console.log("REACT_APP_NODE_ENV:" + process.env.REACT_APP_NODE_ENV)
    return (
      <>
        <Header pageName="about" />
        <main  className="about">
          <div className="blurbContainer">
            {/* reuable bit of code for that heading blurb section that appears on most pages  */}
            <HeadingBlurb blurbOptions={blurbOptions} pageStyles={pageStyles} />
            <div className="blurbContent">
              <p>We're a small team focused on improving the esports scene of rocket league. Our organization, Golden Hour ESports, provides a safe, welcoming community for all. This also presents a unique oppurtunity for us to practice building and running a well rounded business that benefits both our members and our partners.</p>
              <p>Feel free to get in touch with us using the contact info included below:</p>
              <p>mail@ghesports.dev</p>
            </div>
          </div>
        </main>
      </>
    );
}

// styles that are specific to this page
const pageStyles= {
  btnCTA: {
    paddingLeft: "1.75rem",
  },

  btnCTAbg: {
      width: "15.5rem",
      top: "-.25rem",
  }
}

// customizes the heading blurb section
let blurbOptions = {
  heading: "ABOUT US", 
  imgLink: process.env.REACT_APP_SITE_URL + "/imgs/background/esports.jpg", 
  imgAltText: "team image",
  btnText: "NEWEST CIRCUIT", 
  btnLink: "/circuit/1", 
};
