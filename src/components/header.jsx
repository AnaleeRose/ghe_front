import { Logo } from './logo.jsx';
import { SocialMedia } from './socialMedia.jsx';
import { Nav } from './nav.jsx';
import { LoginSignup } from './loginSignup.jsx';
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
