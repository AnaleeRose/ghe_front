
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import UserProfile from '../UserProfile';
import Common from "./../../models/Common"


export const TeamDeleteForm = (props) => {
    const [createResponse, setCreateResponse] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({})

    const onSubmit = data => {
        (async () => {
            setCreateResponse(false)
            if (!props.team_id || !Common.isInt(props.team_id)) {
                return;
            }
            let address = process.env.REACT_APP_BACKEND_URL + `/team/delete/` + props.team_id
            console.log("address")
            console.log(address)
            fetch(address, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: "include",
            }).then(res => res.json())
            .then((res) => {
                console.log("TeamDeleteForm async res")
                console.log(res)
                console.log("typeof res.status")
                console.log(typeof res.status)
                if (res.status) {
                    setCreateResponse(res.status)
                    UserProfile.setTeam(false)
                }
            })
            .catch((e)=>{
                console.log("Couln't send to backend")
                console.log(e)
            })
        })();

    }


    if (UserProfile.getTeam()) {
        let team_info = UserProfile.getTeam();
        if (createResponse === null) {
            return (
                <>
                    <p>Are you sure you want to <span className="bold">permnately delete</span> this team?</p>
                    <p>Team Name: {team_info.name} </p>
                    <form action="get" onSubmit={handleSubmit(onSubmit)} className="form tracker-form">
                        <input type="submit" value="Delete Team" className="btn btn-danger simple"/>
                    </form>
                </>
            );
        }

        if (createResponse === true) {
            return (
                <>
                    <p>{team_info.name} was deleted.</p>
                    <Link to="/user">Return to Profile</Link>
                </>
            );
        } else {
            return (
                <>
                    <p>{team_info.name} could not be deleted. Please try again later.</p>
                    <Link to="/user">Return to Profile</Link>
                </>
            );
        }

    } else {
        return (
            <>
                <p>You're not currently in a team...</p>
                <Link to="/team/create" className="btn btn-trans simple">Create a Team?</Link>
            </>
        );
    }
}
