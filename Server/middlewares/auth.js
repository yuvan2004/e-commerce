const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    // const token = req.header("Authorization").replace("Bearer", " ");
    //  or
    const token = req.header('Authorization').split(" ")[1];
    console.log(token);
    if (!token) return res.status(401).json({ error: "Token required"});
    try {
        const decoded = jwt.verify(token, "secret_key");
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};
module.exports = auth;