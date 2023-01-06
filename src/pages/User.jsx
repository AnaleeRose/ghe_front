import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { validateSession } from "../models/Auth";
import { Header } from "../components/Header.jsx"
import '../styles/styles.scss';

import UserProfile from '../components/UserProfile';
import { Button } from "./../components/Button";

import TrackerForm from "../components/TrackerForm";
import { TrackerInfo } from './../components/TrackerInfo';
import { TeamInfo } from '../components/TeamInfo';

// user homepage
// shows basic user profile

export const User = () => {
    validateSession()
    console.log("UserProfile.getTeam()")
    console.log(UserProfile.getTeam())
    return (
        <>
            <Header pageName="user" />
            <main className="user">
                <div id="info">Welcome, {UserProfile.getName()}!</div>
                <br/>
                {UserProfile.isTrackerLinked() ? <TrackerInfo /> : <Button link='/user/tracker' btn_class="primary" text="Link your RL Tracker" />}
                {UserProfile.getTeam() ? <TeamInfo /> : <Button link='/team/create' btn_class="primary" text="Create a Team" />}
            </main>
        </>
    );

}

//ignore
export const UserLogin = () => {
    return (
        <>
        </>
    );
}

// user login page
// creates account or logs in using discord
export const UserDiscordLogin = () => {
    let [searchParams] = useSearchParams();
    var code = searchParams.get("code");
    let address;
    
    if (code) {
        address = process.env.REACT_APP_BACKEND_URL + `/auth/discord/`;
        try {
            fetch(address, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    code: code, 
                }),
            }).then(res => res.json())
            .then((data) => {
                console.log("backend response")
                console.log(data)

                if (data.user && data.user.status) {
                    console.log("data")
                    console.log(data)
                    console.log("data.user.data")
                    console.log(data.user.data)
                    let user_info = data.user.data;
                    UserProfile.setUserID(user_info.id)
                    UserProfile.setName(user_info.name)
                    UserProfile.setEmail(user_info.email)
                    UserProfile.setDiscordName(user_info.discord_name)
                    UserProfile.setDiscordID(user_info.discord_id)
                    UserProfile.setDiscordAccessToken(user_info.discord_access_token)
                    UserProfile.setDiscordRefreshToken(user_info.discord_refresh_token)
                    console.log("user_info.tracker_link")
                    console.log(user_info.tracker_link)
                    if (user_info.tracker_link) {
                        UserProfile.setIsTrackerLinked(true)
                    } else {
                        UserProfile.setIsTrackerLinked(false)
                    }
                    if (user_info.team) {
                        UserProfile.setTeam(user_info.team)
                    } else {
                        UserProfile.setTeam(false)
                    }
                    sessionStorage.setItem('isLoggedIn', true);
                    
                    // // redirect
                    if (window.sessionStorage.getItem("isLoggedIn") === "true") {
                        console.log("REDIRECTED BY UserDiscordLogin")
                        address = process.env.REACT_APP_SITE_URL + "/user"
                        window.location.replace(address);
                    }
                // } else if (data.status === false || (data.user && data.user.status === false)) {
                } else {
                    // failed to login
                    console.log ("login failed - check logs")
                    sessionStorage.setItem('isLoggedIn', false);
                }
            })
        } catch(e) {
            console.error("CONNECT TO BACKEND ERROR");
            console.error(e);
        }

    } else {
        console.error("NO CODE")
    }

    if (sessionStorage.getItem("isLoggedIn") !== "true" && !code) {
        return (
            <>
            <Header pageName="user" />
                <main  className="auth auth-discord">
                    <Button href={process.env.REACT_APP_DISCORD_AUTH_URL} btn_class="discord" text="Sign in with Discord" />
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn") !== "true" && code) {
        //should time and fi it takes longer than ~5sec warn them login failed and its server side
        return (
            <>
            <Header pageName="user" />
                <main  className="auth auth-discord loading">
                    <p>Loading...</p>
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn") === "true") {
        address = process.env.REACT_APP_SITE_URL + "/user"
        //window.location.replace(address);
    }
}

// user logout page
// logs user out of both the front end and the backend
export const UserLogout = (props) => {
    const [success, setSuccess] = useState(false);
    const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setInfoLoaded(false);
            let res = await fetchLogoutUser();
            console.log("res: " + res)
            if (res) {
                setSuccess(true)
                setInfoLoaded(true);
            } else {
                setSuccess(false)
            }
        })();
    }, []);

    if (!infoLoaded)  {
        return <p>Loading...</p> 
    } else {
        if (success) {
            return (
                <>
                    <Header />
                    <main className="auth auth-logout">
                        <p>Successfully logged out.</p>
                    </main>
                </>
            );
        } else {
            return (
                <>
                    <Header />
                    <main className="auth auth-logout">
                        <p>Something went wrong...</p>
                    </main>
                </>
            );

        }
    }

}

// user page for linking their tracker
export const UserLinkTracker = () => {
    validateSession();

    const [trackerData , setTrackerData] = useState(null)

    useEffect(()=>{
        console.log("UserProfile.getTeam()");
        console.log(UserProfile.getTeam());
        if (UserProfile.isTrackerLinked()) {
            const fetchData = async() => {
                let res =  await fetchTrackerInfo()
                console.log("res - user tracker")
                console.log(res)
                if (res.status) {
                    setTrackerData({rl_username: res.data.rl_username, platform: res.data.platform, tracker_link: res.data.tracker_link, rank: res.data.rank });
                } else {
                    setTrackerData(false);
                }
            }
            fetchData();
        }
    }, [])

    return (
        <>
        <Header pageName="user" />
            <main className="user linkTracker">
                    {(trackerData) ? (<>
                        <TrackerForm tracker_data={trackerData} />
                    </>): (<>
                        <p>Loading...</p>
                    </>)}
            </main>
        </>
    );
}

// helper functions

const fetchLogoutUser = async() => {
    let address = process.env.REACT_APP_BACKEND_URL + `/user/logout`
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            })
        let json = await response.json();
        if (json.status) {
            return { status: true};
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

const fetchTrackerInfo = async() => {
    let address = process.env.REACT_APP_BACKEND_URL + `/user/tracker/` + UserProfile.getUserID();
    console.log(address)
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            })
        let json = await response.json();
        if (json.status) {
            return { status: true, data: json.data};
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