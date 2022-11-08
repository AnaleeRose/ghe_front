import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "../components/Header.jsx"
import { Button } from "./../components/Button";
import '../styles/styles.scss';

export const AuthDiscord = () => {
    const { params } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    var code = searchParams.get("code");

    if (code) {
        try {
            var oauthData;
            const tokenResponseData = fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
                    client_secret: process.env.REACT_APP_DISCORD_CLIENT_SECRET,
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URL,
                    scope: 'identify',
                }).toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("DATA")
                console.log(data)
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${data.token_type} ${data.access_token}`,
                    },
                }).then((response) => response.json())
                .then((res) => {
                    console.log("RES")
                    console.log(res)
                    if (res.username) {
                        document.getElementById("username").innerText = "Your Username: " + res.username;
                    }
                })
            });
        } catch (error) {
            console.error("ERR");
            console.error(error);
        }
    }

    return (
        <>
            <Helmet>
                <script src="https://kit.fontawesome.com/3d78030f24.js" crossorigin="anonymous"></script>
            </Helmet>
            <Header />
            <main  className="auth-discord">
                <Button href="https://discord.com/api/oauth2/authorize?client_id=1025248392244375574&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=code&scope=identify%20email%20guilds" btn_class="primary" text="Link Your Discord" />
                <br />
                <br />
                <p>Does not persist data yet.</p>
                <p id="username"></p>
            </main>
        </>
    );
}