function UserProfile(choice, set = false) {
    switch (choice) {
        case "getDiscordName":
            if (window.sessionStorage.getItem('discord_username')) return window.sessionStorage.getItem('discord_username');
            return false;
            break;
        case "setDiscordName":
            sessionStorage.setItem('discord_username', set);
            return true;
            break;
        case "getDiscordEmail":
            if (window.sessionStorage.getItem('discord_email')) return window.sessionStorage.getItem('discord_email');
            return false;
            break;
        case "setDiscordEmail":
            sessionStorage.setItem('discord_email', set);
            return true;
            break;
        case "getDiscordID":
            if (window.sessionStorage.getItem('discord_id')) return window.sessionStorage.getItem('discord_id');
            return false;
            break;
        case "setDiscordID":
            sessionStorage.setItem('discord_id', set);
            return true;
            break;
    
        default:
            return false;
            break;
    }  
}