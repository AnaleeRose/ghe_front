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
                <p>Manage Your Team: <Link to={link}>{team_info.name}</Link></p>
            </>) : (<>
                <p>Your Team: {team_info.name}</p>
            </>))}
        </>
    );
}
