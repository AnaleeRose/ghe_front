
// this loader pulls the information from the backend and formats it for easy consumption
import CircuitModel from "../models/Circuit";

export async function CircuitLoader() {

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