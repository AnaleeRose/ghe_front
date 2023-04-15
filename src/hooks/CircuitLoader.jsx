
// this loader pulls the information from the backend and formats it for easy consumption
import CircuitModel from "../models/Circuit";

export async function CircuitLoader() {

    // pull data
    var json_data = await CircuitModel.getCircuitData(1);
    console.log("json_data")
    console.log(json_data)
    var data = [];

    // create traditional array from data
    for(var i in json_data)
        data.push([i, json_data[i]]);
    var circuitData = data[0][1];

    let dummyData = [
      {
        match_id: 1,
        match_name: "Team 1 vs Team 2",
        match_number: 1,
        next_match_id: 5,
        round: 1,
        team_1_id: 1,
        team_1_name: "Team 1",
        team_1_win_status: false,
        team_2_id: 2,
        team_2_name: "Team 2",
        team_2_win_status: true,
        total_rounds: 3
      },
      {
        match_id: 2,
        match_name: "Team 3 vs Team 4",
        match_number: 2,
        next_match_id: 5,
        round: 1,
        team_1_id: 3,
        team_1_name: "Team 3",
        team_1_win_status: true,
        team_2_id: 4,
        team_2_name: "Team 4",
        team_2_win_status: false,
        total_rounds: 3
      },
      {
        match_id: 3,
        match_name: "Team 5 vs Team 6",
        match_number: 3,
        next_match_id: 6,
        round: 1,
        team_1_id: 5,
        team_1_name: "Team 5",
        team_1_win_status: true,
        team_2_id: 6,
        team_2_name: "Team 6",
        team_2_win_status: false,
        total_rounds: 3
      },
      {
        match_id: 4,
        match_name: "Team 7 vs Team 8",
        match_number: 4,
        next_match_id: 6,
        round: 1,
        team_1_id: 7,
        team_1_name: "Team 7",
        team_1_win_status: true,
        team_2_id: 8,
        team_2_name: "Team 8",
        team_2_win_status: false,
        total_rounds: 3
      },
      {
        match_id: 5,
        match_name: "Team 2 vs Team 3",
        match_number: 5,
        next_match_id: 7,
        round: 2,
        team_1_id: 2,
        team_1_name: "Team 2",
        team_1_win_status: true,
        team_2_id: 3,
        team_2_name: "Team 3",
        team_2_win_status: false,
        total_rounds: 3
      },
      {
        match_id: 6,
        match_name: "Team 5 vs Team 7",
        match_number: 6,
        next_match_id: 7,
        round: 2,
        team_1_id: 5,
        team_1_name: "Team 5",
        team_1_win_status: false,
        team_2_id: 7,
        team_2_name: "Team 7",
        team_2_win_status: true,
        total_rounds: 3
      },
      {
        match_id: 7,
        match_name: "Team 2 vs Team 7",
        match_number: 7,
        next_match_id: null,
        round: 3,
        team_1_id: 2,
        team_1_name: "Team 2",
        team_1_win_status: false,
        team_2_id: 7,
        team_2_name: "Team 7",
        team_2_win_status: true,
        total_rounds: 3
      },
    ]

    // format data so that it's easily consumed by the brackets component
    let match_info = [];
    let k = 0;
    dummyData.forEach(match => {
    // circuitData.forEach(match => {
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
          "isWinner": match.team_1_win_status,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          "name": match.team_1_name
        },
        {
          "id": match.team_2_id,
          "resultText": null,
          "isWinner": match.team_2_win_status,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          "name": match.team_2_name
        }
      ];
      ++k;
    })

    return { match_info };
}