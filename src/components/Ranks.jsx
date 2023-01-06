var RankCodes = (function() {
    const rankCodes = [
        "b1",
        "b2",
        "b3",
        "s1",
        "s2",
        "s3",
        "g1",
        "g2",
        "g3",
        "d1",
        "d2",
        "d3",
        "c1",
        "c2",
        "c3",
        "gc1",
        "gc2",
        "gc3",
        "ssl",
    ];

    var getFullName = function(rankCode) {
        switch (rankCode) {
            case "b1":
                return "Bronze 1";
            case "b2":
                return "Bronze 2";
            case "b3":
                return "Bronze 3";

            case "s1":
                return "Silver 1";
            case "s2":
                return "Silver 2";
            case "s3":
                return "Silver 3";

            case "g1":
                return "Gold 1";
            case "g2":
                return "Gold 2";
            case "g3":
                return "Gold 3";

            case "d1":
                return "Diamond 1";
            case "d2":
                return "Diamond 2";
            case "d3":
                return "Diamond 3";

            case "c1":
                return "Champ 1";
            case "c2":
                return "Champ 2";
            case "c3":
                return "Champ 3";

            case "gc1":
                return "Grand Champ 1";
            case "gc2":
                return "Grand Champ 2";
            case "gc3":
                return "Grand Champ 3";

            case "ssl":
                return "Super Sonic legend";

            default:
                return false;
        }
    };
    
  
    return {
      getFullName: getFullName,
    }
  
  })();
  
  export default RankCodes;