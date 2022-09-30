// import { Link } from "react-router-dom";
import { Logo } from './Logo';

export function SocialMedia(props) {
    return (
        <div className="socialMedia-container">
            <Logo type="twitter" />
            <Logo type="discord" />
            <Logo type="twitter" />
            <Logo type="discord" />
        </div>
    );
}
