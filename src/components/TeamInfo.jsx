import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button } from "./Button";

export const TeamInfo = (props) => {
    let team_info = UserProfile.getTeam();
    console.log(team_info);
    let link = "/team/manage/" + UserProfile.getTeamID()
    return (
        <>
            {((team_info.team_lead_id === parseInt(sessionStorage.getItem('user_id'))) ? (<>
                <p>Your Team: {team_info.name}</p>
                <Link to={link} className="btn simple">Manage Your Team</Link>
            </>) : (<>
                <p>Your Team: {team_info.name}</p>
            </>))}
        </>
    );
}
