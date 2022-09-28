import {
    Outlet,
    Link,
    useLoaderData,
  } from "react-router-dom";

import CircuitModel from "../models/circuit";

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


export function Circuit() {
    const { circuitData } = useLoaderData();
    circuitData.sort(function(a, b) { return a.id - b.id;})



    return (
        <>
        <div id="detail">The Golden Cup </div>
        <MatchInfo data={circuitData}/>
        </>
    );
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


