const express = require('express')
const router = express.Router();
const { checkValidAdmin } = require("../middleware/validAdmin")



router.post("/signup" ,checkValidAdmin ,(req ,  res)=>{

    try {
        
        res.status(200).json({
            "msg" : "admin registered successfully"
        })

    } catch (error) {
        console.log(error.message);
    }

})


module.exports = router;



