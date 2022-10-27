import { Link } from "react-router-dom";

export function Logo(props) {
    let type = (props.type == null) ? "default" : props.type
    switch(type) {
        case "default":
            return <MainLogo />

        case "twitter":
            return <TwitterLogo />

        case "discord":
            return <DiscordLogo />

        default:
            return <></>;
    }
}

function MainLogo(props) {
    let imgLink = process.env.REACT_APP_SITE_URL + "/imgs/logos/logo.jpg";
    return (
        <>
            <Link to="/home" className="logo">
                <h1 className="a11y-text"><span>Golden Hour eSports</span></h1>
                <img src={imgLink} alt="GHE Logo" />
            </Link>
        </>
    );
}

function TwitterLogo(props) {
    return (
        <>
            <Link to="https://twitter.com/GoldenHourES">
                <p className="a11y-text"><span>Golden Hour eSports Twitter</span></p>
                <i className="fa-brands fa-twitter"></i>
                {/* <img src={process.env.REACT_APP_SITE_URL + "/imgs/logos/twitter.jpg"} /> */}
            </Link>
        </>
    );
}

function DiscordLogo(props) {
    return (
        <>
            <Link to="https://twitter.com/GoldenHourES">
                <p className="a11y-text"><span>Join Golden Hour eSports' Discord</span></p>
                <i className="fa-brands fa-discord"></i>
            </Link>
        </>
    );
}

