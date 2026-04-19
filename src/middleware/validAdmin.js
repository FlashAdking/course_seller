const {  adminModel } = require('../model/userSchema')



const checkValidAdmin = async (req , res , next)=>{
    try {
        
        const admin = req.body;

        if(!admin) throw new Error("new Admin not found");

        let exist = await adminModel.findOne({
            "username" : admin.username
        })

        if(exist) throw new Error("admin is already exist");

        let newAdmin = new adminModel({
            "username" : admin.username,
            "password" : admin.password
        })

        await newAdmin.save();

        next();

    } catch (error) {
        
        
        console.log(error.message);
        res.status(403).json({
            "msg" : "something went wrong while creating a new admin"
        })

    }
}



module.exports = { checkValidAdmin }


