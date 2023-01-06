import UserProfile from "../components/UserProfile";

export const validateSession = async(admin = false, reroute = true) => {
    let address = process.env.REACT_APP_BACKEND_URL + `/auth/`
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            })
        let data = await response.json();
        if (UserProfile.getUserID() && parseInt(UserProfile.getUserID()) === data.id) {
            sessionStorage.setItem('isLoggedIn', true)
            if (admin) {
                // update to pull from db!!!
                if (sessionStorage.getItem('isAdmin') === null) {
                    console.log("REDIRECTED BY validateSession ADMIN")
                    let address = process.env.REACT_APP_SITE_URL + "/user"
                    window.location.replace(address);
                    return false;
                }
            }
            return true;
        }

        sessionStorage.setItem('isLoggedIn', false)
        if (reroute) {
            let address = process.env.REACT_APP_BACKEND_URL + `/user/logout`
            try {
                fetch(address, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    credentials: "include",
                }).then(res => res.json())
                .then(() => {
                    window.sessionStorage.clear();
                    console.log("REDIRECTED BY validateSession")
                    let redirectAddress = process.env.REACT_APP_SITE_URL + "/user/discord"
                    window.location.replace(redirectAddress);
                })
            } catch (e) {
                console.error("ERR");
                console.error(e);
            }
        }
        return false;

    } catch (error) {
        console.error("ERR");
        console.error(error);
    }    
}
