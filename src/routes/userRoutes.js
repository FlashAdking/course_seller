const express = require('express')
const router = express.Router()
const { validUser } = require("../middleware/validUser")


router.post("/signup" , validUser , (req , res )=>{
    
    try {
        
        res.status(200).json({
            "msg" : "user registered successfully",
            "user" : req.body
        })

    } catch (error) {
        
        console.log(error.message);

    }

})



module.exports = router;


