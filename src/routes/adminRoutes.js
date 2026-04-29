const express = require('express')
const router = express.Router();
const { checkValidAdmin , adminExist , createCourse , fetchCreatedCourses } = require("../middleware/adminMiddleware")
const { genrateToken , authenticateAdmin } = require("../auth/userAuth")


router.post("/signup", checkValidAdmin, (req, res) => {

    try {
        res.status(200).json({
            "msg": "admin registered successfully"
        })

    } catch (error) {
        console.log(error.message);
    }

})

router.post("/login", adminExist, genrateToken, (req, res) => {

    res.status(200).json({
        "message": "login successfull",
        "token": req.token
    })

});

router.post("/courses" , authenticateAdmin , createCourse , (req , res)=>{
    
    res.status(200).json({
        "message" : "course added successfully"
    })

})


router.get("/courses" , authenticateAdmin , fetchCreatedCourses , (req , res )=>{

    res.status(200).json({
        "courses" : req.coursesFound
    })

})


module.exports = router;



