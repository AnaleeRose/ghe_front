import { Link } from "react-router-dom";
export const Button = (props) => {
    let btn_container_class = "btn-container btn-" + props.btn_class
    let btn_class = "btn btn-" + props.btn_class
    return (
        <div className={btn_container_class}>
            {props.link ? <Link to={props.link} className={btn_class}>{props.text}</Link> : false}
            {props.href ? <a href={props.href} className={btn_class}>{props.text}</a> : false}
            <svg className="bg" width="90%" height="100%" viewBox="0 0 325 70" preserveAspectRatio="none">
                <g id="Group_284" data-name="Group 284" transform="translate(-292.329 -685.757)">
                    <g id="Group_210" data-name="Group 210" transform="translate(346.285 688.757)">
                    <g transform="matrix(1, 0, 0, 1, -53.96, -3)">
                        <path id="Exclusion_2-2" data-name="Exclusion 2" d="M-34.393,0H223.5l28.774,28.774L223.5,57.549H-34.393L-63.167,28.774Z" transform="translate(67.8 3)" fill={"var(--" + props.btn_class + ")"}/>
                    </g>
                    </g>
                </g>
            </svg>

            {/* <img src={process.env.REACT_APP_SITE_URL + "/imgs/background/btn_" + props.btn_class + ".svg"}/> */}
        </div>
    );
}