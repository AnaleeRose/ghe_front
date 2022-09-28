import { Header } from "../components/header"
import { HeadingBlurb } from "../components/headingBlurb"
import '../styles/_base.scss';
import '../styles/_blurb.scss';

let blurbOptions = {
  heading: "GOLDEN CUP", 
  imgLink:process.env.REACT_APP_SITE_URL + "/imgs/background/trophy.svg", 
  imgAltText: "trophy background image",
  btnText: "SEE MATCHUPS", 
  btnLink: "/circuit/1", 
};

export function Home() {
    return (
      <>
        <Header />
        <main className="home">
          <div className="blurb blurb-heading">
            <HeadingBlurb blurbOptions={blurbOptions} />
            <div className="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.</p>
              <p>May the best team win.</p>
            </div>
          </div>
        </main>
      </>
    );
}
