import {
    Link,
} from "react-router-dom";

export function LoginSignup(props) {
    let type = (props.type == null) ? "header" : props.type
    switch(type) {
        case "header":
            return <MainLoginSignup />

        default:
            return <></>;
    }
}

function MainLoginSignup(props) {
    return (
        <>
            <p className="btn btn-basic">Login/Signup</p>
        </>
    );
}
