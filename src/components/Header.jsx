import { Logo } from './Logo.jsx';
import { SocialMedia } from './SocialMedia.jsx';
import { Nav } from './Nav.jsx';
import { LoginSignup } from './LoginSignup.jsx';
import '../styles/_header.scss';


import { Helmet } from "react-helmet";
export function Header(props) {
    let type = (props.type == null) ? "default" : props.type
    switch (type) {
        case "default":
            return <MainHeader />
    
        default:
            return <></>;
    }

}

export function MainHeader() {

    return (
        <>
        <Helmet>
            <script src="https://kit.fontawesome.com/3d78030f24.js" crossorigin="anonymous"></script>
            <script src="http://localhost:3000/scripts/scripts.js"></script>
        </Helmet>
        <header id="mainHeader" className="mainHeader">
            <div className="logo-social-nav-container">
                <Logo />
                <SocialMedia type="header" />
                <Nav />
            </div>
            <LoginSignup />
        </header>
        </>
      );
}
