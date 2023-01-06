import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import RankCodes from './Ranks';
import { Button } from "./Button";
import { Link } from 'react-router-dom';

export const TrackerInfo = (props) => {
    const [playerInfo, setPlayerInfo] = useState([]);
    const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setInfoLoaded(false);
            let res = await fetchTrackerInfo();
            console.log("RETURNED")
            console.log(res)
            if (res.status) {
                console.log("res2")
                console.log(res)
                console.log("res.data")
                console.log(res.data)
                setPlayerInfo(res.data)
                setInfoLoaded(true);
            } else {
                console.log("false")
            }
        })();
    }, []);

    if (!infoLoaded)  {
        return <p>Loading...</p> 
    } else {
        console.log(playerInfo)
        return (
            <>
                <p>Rocket League Username: <a href={playerInfo.tracker_link}>{playerInfo.rl_username}</a></p>
                <p>Rank: {RankCodes.getFullName(playerInfo.rank)}</p>
                <Link to='/user/tracker' className="btn btn-trans">Edit your RL Tracker Info</Link>
            </>
        )
    }
    // displays tracker info for a user
    // let address = process.env.REACT_APP_BACKEND_URL + `/user/tracker/`;

}

const fetchTrackerInfo = async() => {
    let address = process.env.REACT_APP_BACKEND_URL + `/user/` + UserProfile.getUserID();
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });
        let json = await response.json();
        if (json.status) {
            console.log("json")
            console.log(json)
            return { status: true, data: json.data };
        } else {
            console.log("res failed")
            return { status: false };
        }
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        return { status: false };
    }
}

