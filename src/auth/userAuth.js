const jwt = require('jsonwebtoken');
const { adminModel, userModel } = require('../model/userSchema');
require("dotenv").config();


const genrateToken =  (req , res , next)=>{
    try {
        
        const user = req.body

        let token = jwt.sign({
            "username" : user.username
        } , process.env.JWT_SECRET ?? "key-secret")

        req.token = token

        next();

    } catch (error) {
        
        res.status(403).json({
            "msg" : "something went wrong genrating token"
        })

    }
}

const authenticateAdmin = async (req , res , next)=>{
    try {
        
        const token = req.headers.authorization.split(" ")[1];

        console.log()

        if(!token) throw new Error("token is not thier");

        const decode = jwt.verify(token , process.env.JWT_SECRET);
        
        let exist = await adminModel.findOne({
            "username" : decode.username
        })

        if(!exist) throw new Error("Admin doesnt allowed to proceed");

        req.adminId = exist._id

        next();

    } catch (error) {
        
        console.log(error.message+" here");

        res.status(403).json({
            "message" : error.message
        })

    }
}


// check user jwt token and verify
const authenticateUser = async (req , res , next)=>{

    try {

        const token = req.headers.authorization.split(" ")[1];

        if(!token) throw new Error("token not found please login");

        const decode = jwt.verify(token , process.env.JWT_SECRET);

        const exist = await userModel.findOne({ "username" : decode.username })

        if(!exist) throw new Error("user not found in DB");

        req.userId = exist._id

        next();

    } catch (error) {
        console.log(error.message)

        res.status(403).json({
            "message" : error.message
        })
    }
}


module.exports = { genrateToken  , authenticateAdmin , authenticateUser };