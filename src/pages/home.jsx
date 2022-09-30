import { Helmet } from "react-helmet";
import { Header } from "../components/header"
import { HeadingBlurb } from "../components/headingBlurb"
import '../styles/styles.scss';

export function Home() {
    return (
      <>
        {/* Helmet allows us to stuff custom code into the head of the document */}
        <Helmet>
          <script src="https://kit.fontawesome.com/3d78030f24.js" crossorigin="anonymous"></script>
        </Helmet>
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
  imgLink:process.env.REACT_APP_SITE_URL + "/imgs/background/trophy.svg", 
  imgAltText: "trophy background image",
  btnText: "SEE MATCHUPS", 
  btnLink: "/circuit/1", 
};
