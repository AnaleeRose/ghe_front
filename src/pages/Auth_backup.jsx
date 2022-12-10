import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "../components/Header.jsx"
import { Button } from "../components/Button";
import '../styles/styles.scss';
import UserProfile from '../components/UserProfile';

export const AuthDiscord = () => {
    const { params } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    var code = searchParams.get("code");
    let address = "";


    if (code) {
        try {
            fetch('https://discord.com/api/oauth2/token', {
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
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${data.token_type} ${data.access_token}`,
                    },
                }).then((response) => response.json())
                .then((res) => {
                    console.log("RES")
                    console.log(res)
                    if (res.username) {
                        let discord_id = res.id;
                        let discord_username = res.username;
                        let discord_email = res.email;
                        let discord_access_token = res.access_token;
                        let discord_refresh_token = res.refresh_token;
                        console.log("discord_access_token: " +  discord_access_token)
                        console.log("discord_refresh_token: " +  discord_refresh_token)

                        UserProfile.setDiscordAccessToken(discord_access_token)
                        UserProfile.setDiscordRefreshToken(discord_refresh_token)
                        UserProfile.setDiscordID(discord_id)
                        UserProfile.setDiscordName(discord_username)
                        UserProfile.setEmail(discord_email)

                        sessionStorage.setItem('isLoggedIn', true);

                        address = process.env.REACT_APP_BACKEND_URL + `/auth/discord/`
                        const username = discord_username;
                        const email = discord_email;
                        fetch(address, {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                discord_access_token: discord_access_token, 
                                discord_refresh_token: discord_refresh_token, 
                                email: email, 
                                username: username, 
                                discord_id: discord_id
                            }),
                        }).then(res => res.json())
                        .then((data) => {
                            console.error("backend response")
                            console.log(data)
                            if (data.message[0].status) {
                                let user_info = data.message[0].data[0]
                                UserProfile.setName(user_info.name)
                                UserProfile.setUserID(user_info.id)
                            }
                            else {
                                console.log ("login failed")
                            }

                            // failed to login
                             
                        })
                        .then(() => {
                            // try {
                            //     const userResult = fetch('https://discord.com/api/users/@me', {
                            //         headers: {
                            //             authorization: `${sessionStorage.getItem('discord_refresh_token')} ${sessionStorage.getItem('discord_access_token')}`,
                            //         },
                            //     }).body.json();
    
                            //     console.warning("path")
                            //     console.log("https://cdn.discordapp.com/avatars/" + userResult.user_id + "/" + userResult.user_avatar + ".png")
                            // }
                            // catch(e) {
                            //     console.error("fuck")
                            //     console.log(e)
                            // }

                            // if (window.sessionStorage.getItem("isLoggedIn")) {
                            //     address = process.env.REACT_APP_SITE_URL + "/user"
                            //     window.location.replace(address);
                            // }
                        })

                    } else {
                        console.error('NO USERNAME');
                    }
                })
            });
        } catch (error) {
            console.error("ERR");
            console.error(error);
        }
    } else {
        console.error("NO CODE")
    }
    if (sessionStorage.getItem("isLoggedIn") == undefined && !code) {
        return (
            <>

                <Header />
                <main  className="auth auth-discord">
                    <Button href={process.env.REACT_APP_DISCORD_AUTH_URL} btn_class="primary" text="Link Your Discord" />
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn") == undefined && code) {
        return (
            <>

                <Header />
                <main  className="auth auth-discord loading">
                    <p></p>
                    {/* <Button href={process.env.REACT_APP_DISCORD_AUTH_URL} btn_class="primary" text="Link Your Discord" /> */}
                </main>
            </>
        );
    } else if(sessionStorage.getItem("isLoggedIn")) {
        address = process.env.REACT_APP_SITE_URL + "/user"
        window.location.replace(address);
    }
}

export const AuthLogout = () => {
    let address = process.env.REACT_APP_BACKEND_URL + `/auth/logout`
    try {
        fetch(address, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
            }).then((res) => {
                let data = res.json()
                console.log("logout res")
                console.log(data)
            });
    } catch (error) {
        console.error("ERR");
        console.error(error);
    }

    window.sessionStorage.clear();

    return (
        <>
            <Header />
            <main className="auth auth-logout">
                <p>Successfully logged out.</p>
            </main>
        </>
    );
}




function sendToDb(email, username) {
    let address = process.env.REACT_APP_BACKEND_URL + `/auth/discord/`
    return fetch(address, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            username
        }),
    }).then(res => res.json())
        .then((data) => {
            console.error("backend response")
            console.log(data)
        });
}