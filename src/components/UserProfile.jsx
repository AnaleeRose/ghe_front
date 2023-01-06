import Common from "./../models/Common"

var UserProfile = (function() {
    var getDiscordName = function() {
      if (sessionStorage.getItem('discord_name') !== null) return sessionStorage.getItem('discord_name'); 
      return false;    // Or pull this from cookie/localStorage
    };
  
    var setDiscordName = function(name) {
      sessionStorage.setItem('discord_name', name);
    };  

    var getEmail = function() {
      if (sessionStorage.getItem('email') !== null) return sessionStorage.getItem('email'); 
      return false;
    };
  
    var setEmail = function(email) {
      sessionStorage.setItem('email', email);
    };

    var getDiscordID = function() {
      if (sessionStorage.getItem('discord_id') !== null) return sessionStorage.getItem('discord_id'); 
      return false;
    };
  
    var setDiscordID = function(id) {
      sessionStorage.setItem('discord_id', id);
    };

    var getName = function() {
      if (sessionStorage.getItem('name') !== null) return sessionStorage.getItem('name'); 
      return false;
    };
  
    var setName = function(name) {
      sessionStorage.setItem('name', name);
      // Also set this in cookie/localStorage
    };

    var getUserID = function() {
      if (sessionStorage.getItem('user_id') !== null) return sessionStorage.getItem('user_id'); 
      return false;
    };
  
    var setUserID = function(id) {
      sessionStorage.setItem('user_id', id);
      console.log("https://cdn.discordapp.com/avatars/" + id);
      // Also set this in cookie/localStorage
    };
    
    var setIsTrackerLinked = function(is_tracker_linked) {
      sessionStorage.setItem('is_tracker_linked', is_tracker_linked);
    }
    var isTrackerLinked = function() {
      if (sessionStorage.getItem('is_tracker_linked') === "true") {
        return true;
      } else {
        return false;
      }
    }

    var setTeam = function(teamInfo) {
      if (teamInfo) {
        sessionStorage.setItem('team', JSON.stringify(teamInfo));
      } else {
        sessionStorage.setItem('team', false);
      }
    };

    var getTeam = function() {
      if (sessionStorage.getItem('team')) {
        let team = JSON.parse(sessionStorage.team);
        return team;
      }
      return false;
    };

    var getTeamID = function() {
      if (sessionStorage.getItem('team')) {
        let team = JSON.parse(sessionStorage.team);
        if (Common.isInt(team.id)) {
          return team.id;
        }
        return false;
      }
      return false;
    }



    var setDiscordAccessToken = function(token) {
      sessionStorage.setItem('discord_access_token', token);
    };

    var getDiscordAccessToken = function() {
      if (sessionStorage.getItem('discord_access_token') !== null) return sessionStorage.getItem('discord_access_token'); 
      return false;
    };

    var setDiscordRefreshToken = function(token) {
      sessionStorage.setItem('discord_refresh_token', token);
    };

    var getDiscordRefreshToken = function() {
      if (sessionStorage.getItem('discord_refresh_token') !== null) return sessionStorage.getItem('discord_refresh_token'); 
      return false;
    };

    // var setPicturePath = function(id) {
    //   sessionStorage.setItem('picturePath', process.env.REACT_APP_SITE_URL + "/" + id + ".jpg");
    // };

    var getPicturePath = function() {
      return process.env.REACT_APP_SITE_URL + "imgs/";
    };

    
    
    
  
    return {
      getUserID: getUserID,
      setUserID: setUserID,
      getEmail: getEmail,
      setEmail: setEmail,
      getName: getName,
      setName: setName,
      setIsTrackerLinked: setIsTrackerLinked,
      isTrackerLinked: isTrackerLinked,
      setTeam: setTeam,
      getTeam: getTeam,
      getTeamID: getTeamID,

      setDiscordID: setDiscordID,
      getDiscordID: getDiscordID,
      getDiscordName: getDiscordName,
      setDiscordName: setDiscordName,
      setDiscordAccessToken: setDiscordAccessToken,
      getDiscordAccessToken: getDiscordAccessToken,
      setDiscordRefreshToken: setDiscordRefreshToken,
      getDiscordRefreshToken: getDiscordRefreshToken,

      getPicturePath: getPicturePath,
    }
  
})();
  
export default UserProfile;
