import { Logo } from './Logo.jsx';
import { SocialMedia } from './SocialMedia.jsx';
import { Nav } from './Nav.jsx';
import { LoginSignup } from './LoginSignup.jsx';
import '../styles/_header.scss';


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
        <header id="mainHeader" className="mainHeader">
            <div className="logo-social-nav-container">
                <Logo />
                <SocialMedia type="header" />
                <Nav />
            </div>
            <LoginSignup />
        </header>
      );
}
