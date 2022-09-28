import {
    Outlet,
    Link,
    useLoaderData,
  } from "react-router-dom";

import CircuitModel from "../models/circuit";
import { Header } from "../components/header"
import { HeadingBlurb } from "../components/headingBlurb"
import '../styles/_base.scss';
import '../styles/_blurb.scss';
import styles from "../styles/circuit.module.scss";


let blurbOptions = {
    heading: "GOLDEN CUP CIRCUIT", 
    imgLink:process.env.REACT_APP_SITE_URL + "/imgs/background/trophy.svg", 
    imgAltText: "trophy background image",
    btnText: "JOIN A TEAM", 
    btnLink: "/franchises", 
  };

export function Circuit() {
    const { circuitData } = useLoaderData();
    circuitData.sort(function(a, b) { return a.id - b.id;})



    return (
        <>
        <Header />
        <main className="circuit">
          <div className="blurb blurb-heading">
            <HeadingBlurb blurbOptions={blurbOptions} />
            <div className="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.</p>
              <p>May the best team win.</p>
            </div>
          </div>
        </main>
        <MatchInfo data={circuitData}/>
        </>
    );
}

export async function circuitLoader() {
    var json_data = await CircuitModel.getCircuitData(1);
    var data = [];

    for(var i in json_data)
        data.push([i, json_data[i]]);

    var circuitData = data[0][1];

    circuitData.sort(function(a, b) {
        return a.match_number- b.match_number;
    });
    return { circuitData };
}

const MatchInfo = ({data}) => (
    <div>
        {data.map((match, index) => (
        <div className="match" key={match.match_id}>
            <p className="hidden">Match Number: {match.match_number}</p>
            <p>Team 1 Name: {(match.team1_name != null) ? match.team1_name : "Winnder of Match #" + match.match_1_number}</p>
            <p>Team 2 Name: {(match.team2_name != null) ? match.team2_name : "Winnder of Match #" + match.match_2_number}</p>
        </div>
        ))}
    </div>
); 


