// import { Link } from "react-router-dom";
import { Button } from "./Button.jsx";

export function Nav(props) {
    let type = (props.type == null) ? "default" : props.type
    switch(type) {
        case "default":
            return <MainNav />

        default:
            return <></>;
    }
}

function MainNav(props) {
    return (
        <nav>
            <Button link="/circuit/1" btn_class="primary" text="Circuit" />
            <Button link="/user" btn_class="primary" text="Profile" />
            <Button link="/about" btn_class="primary" text="About Us" />
            <Button link="/circuit/1" btn_class="secondary" text="Donate" />
        </nav>
    );
}
