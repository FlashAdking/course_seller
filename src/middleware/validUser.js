const { userModel } = require("../model/userSchema")

const validUser = async (req , res , next )=>{
    
    try {
        
        const usr = req.body;
        
        if(!usr) throw new Error("user not found while registration");

        const exist = await userModel.findOne({
            username : usr.username
        })


        if(exist) throw new Error("user is already present");

        let newUsr = new userModel({
            usr,
        })

        await newUsr.save();

        next();

    } catch (error) {
        
        console.log(error.message)

        res.status(503).json({
            "msg" : "something went wrong while registration of user",
            "error" : error.message
        })

    }
}



module.exports = { validUser } 