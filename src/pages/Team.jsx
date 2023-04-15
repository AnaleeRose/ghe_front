import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validateSession } from "../models/Auth";
import { Header } from "../components/Header.jsx"
import '../styles/styles.scss';

import UserProfile from '../components/UserProfile';
import { Button } from "./../components/Button";

import { TeamForm } from "../components/Team/TeamForm";
import { TeamDeleteForm } from "../components/Team/TeamDeleteForm";
import { fetchTeamInfo } from '../models/Team'

// user page for linking their tracker
export const TeamCreate = () => {
    validateSession();
    return (
        <>
        <Header pageName="team" />
            <main className="team create">
                <TeamForm stage="create" />
            </main>
        </>
    );
}

export const TeamDelete = () => {
    validateSession();
  
    const [teamData , setTeamData] = useState(null)

    useEffect(()=>{
        console.log("UserProfile.getTeam()");
        console.log(UserProfile.getTeam());
        if (UserProfile.getTeam()) {
            (async () => {
                let res =  await fetchTeamInfo(UserProfile.getTeamID())
                console.log(res)
                if (res.status) {
                    setTeamData({team_name: res.data.name, region: res.data.region, type_id: res.data.type_id});
                } else {
                    setTeamData(false);
                }
            })();
        }
    }, [])

    return (
        <>
        <Header pageName="team" />
            <main className="team manage">
            {(UserProfile.getTeam()) ? (<>
                {(teamData) ? (<>
                    <TeamDeleteForm team_id={UserProfile.getTeamID()} team_data={teamData}  />
                </>): (<>
                    <p>Loading...</p>
                </>)}
            </>):(<>
                <p>You're not currently in a team...</p>
                <Link to="/team/create" className="btn btn-trans simple">Create a Team?</Link>
            </>)}
            </main>
        </>
    );

}

export const TeamManage = () => {
    validateSession();

    const [teamData , setTeamData] = useState(null)

    useEffect(()=>{
        console.log("UserProfile.getTeam()");
        console.log(UserProfile.getTeam());
        console.log("UserProfile.getTeamID()")
        console.log(UserProfile.getTeamID())
        if (UserProfile.getTeam()) {
            const fetchData = async() => {
                let res =  await fetchTeamInfo(UserProfile.getTeamID())
                console.log("TeamManage res")
                console.log(res)
                if (res.status) {
                    setTeamData({team_name: res.data.team_data.name, region: res.data.team_data.region, type_id: res.data.team_data.type_id, team_users: res.data.team_users});
                } else {
                    setTeamData(false);
                }
            }
            fetchData();
        }
    }, [])

    return (
        <>
        <Header pageName="team" />
            <main className="team manage">
            {(UserProfile.getTeam()) ? (<>
                {(teamData) ? (<>
                    <TeamForm stage="manage" team_id={UserProfile.getTeamID()} team_data={teamData} />
                </>): (<>
                    <p>Loading...</p>
                </>)}
            </>):(<>
                <p>You're not currently in a team...</p>
                <Link to="/team/create" className="btn simple">Create a Team?</Link>
            </>)}
            </main>
        </>
    );
}
    
