


// this loader pulls the information from the backend and formats it for easy consumption
import AdminModel from "../models/Admin";

export async function AdminUsersLoader() {
    // unused
    // pull data
    var all_users = await AdminModel.getAllUsers();

    console.log("all_users");
    console.log(all_users);
    return { all_users };
}