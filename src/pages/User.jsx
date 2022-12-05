import { validateSession } from "../models/Auth.js";
import { Header } from "../components/Header.jsx"
import { LoginSignup } from '../components/LoginSignup.jsx';

export default function User() {
    if (validateSession()) {
        return (
            <>
                <Header />
                <main className="user">
                    <div id="info">Welcome, {sessionStorage.getItem("discord_name")}!</div>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Header />
                <main className="user">
                    <p>Not logged in...</p>
                    <LoginSignup />
                </main>
            </>
        );
    }
}
