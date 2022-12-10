export default class AdminModel {
    static getAllUsers() {
        let address = process.env.REACT_APP_BACKEND_URL + `/users`
        fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(res => res.json())
        .then((data) => {
            let all_users = [];
            let k = 0;
            data.data.forEach(user => {
                all_users[k] = [];
                all_users[k]["id"] = user["id"]
                all_users[k]["name"] = user["name"]
                all_users[k]["mod_score"] = user["mod_score"]
                all_users[k]["team_id"] = user["team_id"]
                all_users[k]["rank"] = user["rank"]
                all_users[k]["tracker_link"] = user["tracker_link"]
                all_users[k]["tracker_verified"] = user["tracker_verified"]
            })
            console.log("all_users model")
            console.log(all_users)
            return all_users;
        })
    }
}
