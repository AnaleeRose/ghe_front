// helper functions
export const fetchTeamInfo = async(data_only = false, team_id) => {
    let address = process.env.REACT_APP_BACKEND_URL + `/team/` + team_id
    try {
        let response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            })
        let json = await response.json();
        if (json.status) {
            if (data_only) return json.data;
            return { status: true, data: json.data};
        } else {
            console.log("res failed")
            if (data_only) return false;
            return { status: false };
        }
    } catch(e) {
        console.log("Couln't send to backend")
        console.log(e)
        if (data_only) return false;
        return { status: false };
    }
}

var Common = (function() {
    var isInt = function(value) {
        return !isNaN(value) && 
            parseInt(Number(value)) == value && 
            !isNaN(parseInt(value, 10));
    };

    return {
        isInt: isInt,
    }
})();