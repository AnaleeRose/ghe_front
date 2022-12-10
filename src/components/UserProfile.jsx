var UserProfile = (function() {
    var getDiscordName = function() {
      return sessionStorage.getItem('discord_username');    // Or pull this from cookie/localStorage
    };
  
    var setDiscordName = function(name) {
      sessionStorage.setItem('discord_name', name);
    };  
    var getEmail = function() {
      return sessionStorage.getItem('email');    // Or pull this from cookie/localStorage
    };
  
    var setEmail = function(email) {
      sessionStorage.setItem('email', email);
    };

    var getDiscordID = function() {
      return window.sessionStorage.getItem('discord_id');    // Or pull this from cookie/localStorage
    };
  
    var setDiscordID = function(id) {
      sessionStorage.setItem('discord_id', id);
    };

    var getName = function() {
      return sessionStorage.getItem("name");  
        // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      sessionStorage.setItem('name', name);
      // Also set this in cookie/localStorage
    };

    var getUserID = function() {
      return window.sessionStorage.getItem('user_id');    // Or pull this from cookie/localStorage
    };
  
    var setUserID = function(id) {
      sessionStorage.setItem('user_id', id);
      console.log("https://cdn.discordapp.com/avatars/" + id);
      // Also set this in cookie/localStorage
    };
    
    var setIsTrackerLinked = function(is_tracker_linked) {
      sessionStorage.setItem('is_tracker_linked', false);
      // sessionStorage.setItem('is_tracker_linked', is_tracker_linked);
    }
    var getIsTrackerLinked = function() {
      return sessionStorage.getItem('is_tracker_linked');
    }
    
    
    var setTrackerInfo = function(is_tracker_info) {
      sessionStorage.setItem('tracker_info', [{rl_username: "username", tracker_code: "01234"}]);
      // sessionStorage.setItem('tracker_info', is_tracker_info);
    }
    var getTrackerInfo = function() {
      return sessionStorage.getItem('tracker_info');
    }

    var setDiscordAccessToken = function(token) {
      sessionStorage.setItem('discord_access_token', token);
    };

    var getDiscordAccessToken = function() {
      return sessionStorage.getItem('discord_access_token');
    };

    var setDiscordRefreshToken = function(token) {
      sessionStorage.setItem('discord_refresh_token', token);
    };

    var getDiscordRefreshToken = function() {
      return sessionStorage.getItem('discord_refresh_token');
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
      getIsTrackerLinked: getIsTrackerLinked,
      setTrackerInfo: setTrackerInfo,

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