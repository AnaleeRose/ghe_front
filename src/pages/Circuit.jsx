import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createContext } from 'react';
import { Header } from "../components/Header.jsx";
import { HeadingBlurb } from "../components/HeadingBlurb.jsx";
import { Matches } from "../components/Circuit/Matches";
import '../styles/styles.scss';

const PageName = createContext("circuit");

// displays the circuit page
export const Circuit = () => {
    const { match_info } = useLoaderData();

    return (
        <>
        <Header pageName="circuit" />
        <main className="circuit">
          <section className="blurbContainer">
            <HeadingBlurb blurbOptions={blurbOptions} pageStyles={pageStyles} />
            <div className="blurbContent">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.</p>
              <p>May the best team win.</p>
            </div>
          </section>
          <Matches matches={match_info}/>
        </main>
        </>
    );
}

// styles that are specific to this page
const pageStyles= {
  matchupsContainer: {
    margin: "6rem 0 0",
  },

  btnCTA: {
    paddingLeft: "2.25rem",
  },

  btnCTAbg: {
    width: "15rem",
    top: "-.15rem",
  }
}

// customizes the heading blurb section
let blurbOptions = {
    heading: "THE GOLDEN CUP", 
    imgLink:process.env.REACT_APP_SITE_URL + "/imgs/background/trophy.svg", 
    imgAltText: "trophy background image",
    btnText: "JOIN A TEAM", 
    btnLink: "/franchises", 
};
