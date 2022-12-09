import { validateSession } from "../models/Auth.js";
import { Header } from "../components/Header.jsx"
import { LoginSignup } from '../components/LoginSignup.jsx';
import { useSearchParams } from "react-router-dom";
import { Button } from "./../components/Button";
import TrackerForm from "./../hooks/TrackerForm";
import UserProfile from './../components/UserProfile';
import TrackerInfo from './../components/TrackerInfo';
import '../styles/styles.scss';

// user homepage
// shows basic user profile
export const User = () => {
    validateSession()
    return (
        <>
            <Header />
            <main className="user">
                <div id="info">Welcome, {UserProfile.getName()}!</div>
                <br/>
                {UserProfile.getIsTrackerLinked() ? <TrackerInfo info={UserProfile.getTrackerInfo()}/> : <Button href='/user/tracker' btn_class="primary" text="Link your RL Tracker" />}
            </main>
        </>
    );
}

// user login page
// creates account or logs in using discord
export const UserLogin = () => {
    console.log("routed correctly")
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
                if (data.user.status) {
                    let user_info = data.user.data[0]
                    UserProfile.setUserID(user_info.id)
                    UserProfile.setName(user_info.name)
                    UserProfile.setEmail(user_info.email)
                    UserProfile.setDiscordID(user_info.discord_id)
                    UserProfile.setDiscordAccessToken(user_info.discord_access_token)
                    UserProfile.setDiscordRefreshToken(user_info.discord_refresh_token)
                    sessionStorage.setItem('isLoggedIn', true);
                    
                    // // redirect
                    if (window.sessionStorage.getItem("isLoggedIn")) {
                        address = process.env.REACT_APP_SITE_URL + "/user"
                        window.location.replace(address);
                    }
                } else {
                    // failed to login
                    console.log ("login failed - check docker")
                }
            })
        } catch(e) {
            console.error("CONNECT TO BACKEND ERROR");
            console.error(e);
        }

    } else {
        console.error("NO CODE")
    }

    if (sessionStorage.getItem("isLoggedIn") === null && !code) {
        return (
            <>
                <Header />
                <main  className="auth auth-discord">
                    <Button href={process.env.REACT_APP_DISCORD_AUTH_URL} btn_class="discord" text="Sign in with Discord" />
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn") === null && code) {
        return (
            <>
                <Header />
                <main  className="auth auth-discord loading">
                    <p></p>
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn")) {
        address = process.env.REACT_APP_SITE_URL + "/user"
        window.location.replace(address);
    }
}

// user logout page
// logs user out of both the front end and the backend
export const UserLogout = () => {
    validateSession();
    let address = process.env.REACT_APP_BACKEND_URL + `/auth/logout`
    try {
        fetch(address, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
            }).then((res) => {
                let data = res.json()
                console.log("logout res")
                console.log(data)
            });
    } catch (error) {
        console.error("ERR");
        console.error(error);
    }

    window.sessionStorage.clear();

    return (
        <>
            <Header />
            <main className="auth auth-logout">
                <p>Successfully logged out.</p>
            </main>
        </>
    );
}

// user page for linking their tracker
export const UserLinkTracker = () => {
    validateSession()
    console.log(process.env.REACT_APP_RL_API_LINK_BASE)
    console.log(UserProfile.getIsTrackerLinked())
    if (!UserProfile.getIsTrackerLinked()) {
        return (
            <>
                <Header />
                <main className="user linkTracker">
                    <TrackerForm />
                </main>
            </>
        );
    } else {
        let address = process.env.REACT_APP_SITE_URL + "/user"
        window.location.replace(address);
    }
}