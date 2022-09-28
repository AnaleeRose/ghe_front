import {
    Link,
} from "react-router-dom";

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
            <Link to="/home"className="btn btn-primary">Home</Link>
            <Link to="/circuit/1"className="btn btn-primary">Circuit</Link>
            <Link to="/circuit/1"className="btn btn-primary">About</Link>
            <Link to="/circuit/1"className="btn btn-primary">Contact</Link>
            <Link to="/circuit/1" className="btn btn-secondary">Donate</Link>
        </nav>
    );
}
