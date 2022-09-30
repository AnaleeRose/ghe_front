// import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Button } from "./Button.jsx";


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
            { props.userExists ? 
                <Button link="/" btn_class="basic" text="LOGOUT" />
                :
                <div className="login-signup-container">
                    <Button link="/" btn_class="trans" text="LOGIN" />
                    <Button link="/" btn_class="primary" text="SIGN UP" />
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
