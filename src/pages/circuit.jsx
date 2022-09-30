import { useLoaderData } from "react-router-dom";
import CircuitModel from "../models/circuit";
import { Helmet } from "react-helmet";
import { Header } from "../components/header"
import { HeadingBlurb } from "../components/headingBlurb"
import { Matches } from "../components/matches"
import '../styles/styles.scss';

// displays the circuit page
export function Circuit() {
    const { match_info } = useLoaderData();

    return (
        <>
        <Helmet>
          <script src="https://kit.fontawesome.com/3d78030f24.js" crossorigin="anonymous"></script>
        </Helmet>
        <Header />
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

// this loader pulls the information from the backend and formats it for easy consumption
export async function circuitLoader() {

    // pull data
    var json_data = await CircuitModel.getCircuitData(1);
    var data = [];

    // create traditional array from data
    for(var i in json_data)
        data.push([i, json_data[i]]);
    var circuitData = data[0][1];

    // format data so that it's easily consumed by the brackets component
    let match_info = [];
    let k = 0;
    circuitData.forEach(match => {
      match_info[k] = []
      match_info[k]["id"] = match.match_id;
      // match_info[k]["name"] = match.match_name;
      match_info[k]["nextMatchId"] = match.next_match_id;
      match_info[k]["tournamentRoundText"] = match.round;
      // match_info[k]["startTime"] = "2021-05-30";
      match_info[k]["state"] = "DONE";
      match_info[k]["participants"] = [
        {
          "id": match.team_1_id,
          "resultText": null, // Any string works
          "isWinner": null,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          "name": match.team_1_name
        },
        {
          "id": match.team_2_id,
          "resultText": null,
          "isWinner": null,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          "name": match.team_2_name
        }
      ];
      ++k;
    })

    return { match_info };
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
