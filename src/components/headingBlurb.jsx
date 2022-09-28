import { Link } from "react-router-dom";
import '../styles/_headingBlurb.scss';


export function HeadingBlurb(props) {
    let type = (props.type == null) ? "default" : props.type

    switch (type) {
        case "default":
            return (
                <>
                <h2 className="heading">{props.blurbOptions.heading}</h2>
                <div className="btnContainer">
                    <Link className="btn btn-cta" to={props.blurbOptions.btnLink}>{props.blurbOptions.btnText}</Link>
                </div>
                <div className="img-section">
                    <img  src={props.blurbOptions.imgLink} alt={props.blurbOptions.imgAltText}/>
                </div>
                </>
            )
    
        default:
            return <></>;
    }

}
