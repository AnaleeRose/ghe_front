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
            <Button link="/circuit/1" btn_class="primary" text="Franchises" />
            <Button link="/circuit/1" btn_class="primary" text="Partners" />
            <Button link="/circuit/1" btn_class="secondary" text="Donate" />
        </nav>
    );
}
