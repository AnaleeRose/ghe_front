// import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button } from "./Button.jsx";
import { ProfilePicture } from "./ProfilePicture.jsx"
import { IsLoggedIn } from "./../hooks/IsLoggedIn.jsx";
import { GetUsername } from "./../hooks/GetUsername.jsx";
import { Link } from "react-router-dom";
import UserProfile from './UserProfile';

export const LoginSignup = (props) => {
    let type = (props.type == null) ? "header" : props.type
    switch(type) {
        case "header":
            return <MainLoginSignup />
            
        default:
            return <></>;
    }
}

const MainLoginSignup = (props) => {
    return (
        <>
            { ((sessionStorage.getItem("isLoggedIn")) == "true") ? 
                <div className="login-signup-container">
                    <div className='profile-info'>
                        <ProfilePicture />
                        <Link to="/user" className="logo">{UserProfile.getName()}</Link>
                    </div>
                    <Button link="/user/logout" btn_class="trans" text="LOGOUT" />
                </div>
                :
                <div className="login-signup-container">
                    <Button link="/user/discord" btn_class="trans" text="LOGIN" />
                    <Button link="/user/discord" btn_class="primary" text="SIGN UP" />
                </div>
            }
        </>
    );
}
