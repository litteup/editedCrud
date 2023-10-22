require("dotenv").config();
const jwt = require("jsonwebtoken");


<<<<<<< HEAD
function isUserLoggedIn(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).send("no authorization header");
        return;
    }

    const val = authorizationHeader.split(" ");

    const tokenType = val[0];
    const tokenValue = val[1];

    if (tokenType == "Bearer") {
        const decoded = jwt.verify(tokenValue, process.env.SECRET);
        req.decoded = decoded;
        next();
        return;
    }
    res.status(401).send("not authorized");
}


function onlyAdmin (req, res, next) {
    if (req.decoded.role == "admin") {
        next();
    } else {
        res.status(403).send("action-not-allowed");
    }
}


module.exports = {isUserLoggedIn, onlyAdmin};
=======
function isUserLoggedIn(req, res, next){
    let authorizationHeader = req.headers.authorization;


    if (!authorizationHeader){
        return res.status(401).send("no-authorization-header");
    }

    let value = authorizationHeader.split(" ");

    let tokenType = value[0];

    let tokenValue = value[1];

    if(tokenType == "Bearer"){
        const decoded = jwt.verify(tokenValue, process.env.SECRET);
        req.decoded = decoded;
        
        next();
        return;
    };

    res.status(403).send("action-not-allowed");
};


function adminsOnly(req, res, next){
    
    if(req.decoded.role == "admin"){
        next();
    }else return res.status(401).send("You are not an admin.");
}




module.exports = {
    isUserLoggedIn,
    adminsOnly
}
>>>>>>> eeb454b (upload after making first correction)
