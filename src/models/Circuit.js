export default class CircuitModel {
    static getCircuitData(id) {
        let address = process.env.REACT_APP_BACKEND_URL + `/circuit/${id}`
        return fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(res => res.json())
        // }).then(function(res) {
        //     console.log(res.text())
        //     res.json()
        // })
    }
}
