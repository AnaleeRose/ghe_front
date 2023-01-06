// import { Link } from "react-router-dom";
export const Popup = (props) => {
    let defaultClasses = "popup popup-"
    let classes, bgClasses;
    if (props.visibility === true) {
        classes = defaultClasses + props.type
    } else{
        classes = defaultClasses + props.type + " hidden"
        document.querySelector("body").style.overflow = "auto";
    }
    let headerClasses = "header"

    if (props.classesOnly) {
        return [{classes: classes}];
    }
    if (props.bgOnly) {
        let defaultBGClasses = "popup-bg"
        if (props.visibility === true) {
            bgClasses = defaultBGClasses
        } else{
            bgClasses = defaultBGClasses + " hidden"
        }
        return (
            <span className={bgClasses}></span>
        );
    }
    if(props.headerOnly && props.text) {
        return (
            <span className={headerClasses}>{props.text}</span>
        );
    }
}