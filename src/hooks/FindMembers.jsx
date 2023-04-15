import React, { useState, useEffect, useCallback, useRef, Component } from 'react';
import UserProfile from '../components/UserProfile';
import RankCodes from '../components/Ranks';
import { Button } from "./../components/Button";
import { SearchBar } from "./SearchBar";
import { useForm } from "react-hook-form";

export const FindMembers = (props) => {
    const [allUsers, setAllUsersInfo] = useState(false);
    
    useEffect(() => {
        (async () => {
            let all_users_data = await fetchUserData();
            console.log("all_users_data")
            console.log(all_users_data)

            // remove the current user from the list
            let user_id = UserProfile.getUserID();
            var user_index = all_users_data.map(function(o) { return o.id; }).indexOf(user_id);
            all_users_data.splice(user_index, 1);

            setAllUsersInfo(all_users_data)
        })();
    }, [])



    // const sendRequest = useCallback(async () => {
    //     console.log("sendRequest START")
    //     // don't send again while we are sending
    //     if (isSending) return
    //     // update state
    //     setIsSending(true)
    //     // send the actual request
    //     await setTimeout(5000)
    //     // once the request is sent, update state again
    //     if (isMounted.current) // only update if we are still mounted
    //     setIsSending(false)
    //     console.log("sendRequest END")
    // }, [isSending]) // update the callback if the state changes

    return (
        <>

            <div className="searchbar">
                <p className="header">Find Members</p>
                {/* {(selected) ? <><p>Selected: {selected}</p></> : false} */}
                {(allUsers) ? <span className="disabled"></span> : false}
                <SearchBar selected={props.selected} onChangeSelected={props.onChangeSelected} placeholder={UserProfile.getName()} data={allUsers}/>
                <span>Search by Discord Name</span>
            </div>
        </>
    );

    // displays tracker info for a user
    // let address = process.env.REACT_APP_BACKEND_URL + `/user/tracker/`;

}

const fetchSearchName = async(search_term) => {
    let address = process.env.REACT_APP_BACKEND_URL + `/user/discord`;
    console.log("search_term2")
    console.log(search_term)
    try {
        let response = await fetch(address, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: "include",
            body: new URLSearchParams({
                'discord_name': search_term,
            })
        });
        let json = await response.json();
        if (json.data) {
            return { status: json.status, data: json.data };
        } else {
            return { status: json.status };
        }
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        return { status: false };
    }
}


const fetchUserData = async() => {
    let address = process.env.REACT_APP_BACKEND_URL + `/users/search`;
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: "include",
        });
        let json = await response.json();
        if (json.data) {
            return json.data;
        } else {
            return { status: json.status };
        }
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        return { status: false };
    }
}

