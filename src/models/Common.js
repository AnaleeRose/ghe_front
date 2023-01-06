
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

export default Common;
