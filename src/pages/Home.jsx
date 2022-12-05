import { Helmet } from "react-helmet";
import { Header } from "../components/Header.jsx"
import { HeadingBlurb } from "../components/HeadingBlurb.jsx"
import '../styles/styles.scss';

export function Home() {
  console.log("REACT_APP_BACKEND_URL:" + process.env.REACT_APP_BACKEND_URL)
  console.log("REACT_APP_NODE_ENV:" + process.env.REACT_APP_NODE_ENV)
    return (
      <>
        <Header />
        <main  className="home">
          <div className="blurbContainer">
            {/* reuable bit of code for that heading blurb section that appears on most pages  */}
            <HeadingBlurb blurbOptions={blurbOptions} pageStyles={pageStyles} />
            <div className="blurbContent">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.</p>
              <p>May the best team win.</p>
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
  heading: "WHO WE ARE", 
  imgLink: process.env.REACT_APP_SITE_URL + "/imgs/background/trophy.svg", 
  imgAltText: "trophy background image",
  btnText: "SEE MATCHUPS", 
  btnLink: "/circuit/1", 
};
