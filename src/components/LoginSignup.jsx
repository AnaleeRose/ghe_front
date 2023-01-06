import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Popup } from "./Popup.jsx";
import { Button } from "./Button.jsx";
import { ProfilePicture } from "./ProfilePicture.jsx"
import { Link } from "react-router-dom";
import UserProfile from './UserProfile';
import { validateSession } from "../models/Auth";

export const LoginSignup = (props) => {
    let type = (props.type == null) ? "header" : props.type
    switch(type) {
        case "header":
            return <MainLoginSignup />

        case "popupVer":
            return <PopupLoginSignup pageName={props.pageName} />
            
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

const PopupLoginSignup = (props) => {
    const [PopupVisibility, setPopupVisibility] = useState(false);
    const [loggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        (async () => {
            let res = await validateSession(false, false);
            setLoggedIn(res)
        })();
    }, []);
    
    const handleBtnClick = (e) => {
        setPopupVisibility((prev) => !prev);
        // PopupVisibility ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "auto";
     };
    
    let [searchParams] = useSearchParams();
    const pageName = props.pageName ? props.pageName : false;

    var code = searchParams.get("code");
    let popup = Popup({classesOnly:true, type:"login-signup", visibility:PopupVisibility})
    let buttonInfo = Button({btn_class:"trans", text:"LOGIN", btnClassesOnly:true })
    let addtlContainerPopupClasses = PopupVisibility ? "" : " hidden"
    let ContainerPopupClasses = popup[0].classes + addtlContainerPopupClasses

    if (loggedIn == null || !loggedIn) {
        return (
            <>
                <div className="login-signup-container">
                    {/* <button onClick={(e) => handleBtnClick(e)}>Login</button> */}
                    <div className={buttonInfo[0].btn_container_class}>
                        <button className={buttonInfo[0].btn_class} onClick={(e) => handleBtnClick(e)}>LOGIN</button>
                    </div>
                    {/* <Button btn_class="trans" text="LOGIN" clickHandler={(e) => handleBtnClick(e)} /> */}
                </div>
                <Popup bgOnly visibility={PopupVisibility} />
                <div className={ContainerPopupClasses}>
                    <Popup headerOnly text="Login or Sign Up" />
                    <Button href={process.env.REACT_APP_DISCORD_AUTH_URL} btn_class="discord" text="Sign in with Discord" />
                    <button onClick={(e) => handleBtnClick(e)} className="close"><p className="a11y-text"><span>Close</span></p>x</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="login-signup-container">
                    <div className='profile-info'>
                        <ProfilePicture />
                        <Link to="/user" className="logo">{UserProfile.getName()}</Link>
                    </div>
                    <Button link="/user/logout" btn_class="trans" text="Logout" />
                </div>

            </>
        );
    }

  }

    