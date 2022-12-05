// import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button } from "./Button.jsx";
import { ProfilePicture } from "./ProfilePicture.jsx"
import { IsLoggedIn } from "./../hooks/IsLoggedIn.jsx";
import { GetUsername } from "./../hooks/GetUsername.jsx";
import UserProfile from './UserProfile';

export const LoginSignup = (props) => {
    let type = (props.type == null) ? "header" : props.type
    switch(type) {
        case "header":
            return <MainLoginSignup />
            
        case "popupVer":
            return <PopupVer />

        default:
            return <></>;
    }
}

const MainLoginSignup = (props) => {
    return (
        <>
            { ((sessionStorage.getItem("isLoggedIn")) == "true") ? 
                <div className="login-signup-container">
                    <ProfilePicture />
                    <Button link="/auth/logout" btn_class="trans" text="LOGOUT" />
                </div>
                :
                <div className="login-signup-container">
                    <Button link="/auth/discord" btn_class="trans" text="LOGIN" />
                    <Button link="/auth/discord" btn_class="primary" text="SIGN UP" />
                </div>
            }
        </>
    );
}

const PopupVer = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
}
