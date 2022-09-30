import { Link } from "react-router-dom";


export function HeadingBlurb(props) {
    let type = (props.type == null) ? "default" : props.type
    let pageStyles = props.pageStyles;


    switch (type) {
        case "default":
            return (
                <>
                    <h2 className="blurbHeading">{props.blurbOptions.heading}</h2>
                    <div className="btnContainer">
                        <Link className="btnCTA" style={pageStyles.btnCTA} to={props.blurbOptions.btnLink}>{props.blurbOptions.btnText}</Link>
                        <img className="btnCTAbg" style={pageStyles.btnCTAbg} src={process.env.REACT_APP_SITE_URL + "/imgs/background/cta_btn.svg"} alt={props.blurbOptions.imgAltText}/>
                    </div>
                    <div className="imgSection">
                        <img className="bgImg" src={props.blurbOptions.imgLink} alt={props.blurbOptions.imgAltText}/>
                    </div>
                </>
            )
    
        default:
            return <></>;
    }

}
