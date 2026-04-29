const express = require('express')
const router = express.Router();
const { userExist } = require("../middleware/userMiddleware")
const { genrateToken , authenticateUser } = require("../auth/userAuth")
const { validUser , fetchCourses , purchaseCourse , fetchmycourses } = require("../middleware/userMiddleware")


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

router.post("/login" , userExist , genrateToken ,  (req , res)=>{
    try {
        
        res.status(200).json({
            "msg" : "login Successfull",
            "token" : req.token
        })


    } catch (error) {
        
        console.log(error.message);

    }
})


router.get("/courses" , authenticateUser , fetchCourses , (req , res)=>{

    res.status(200).json({
        "message" : "courses fetched successfully",
        "courses" : req.courses
    })
})


router.post("/courses/:courseId" , authenticateUser , purchaseCourse, (req , res)=>{

    res.status(200).json({
        "message" : "course bought successfully",
        "course" : req.course
    })

})

router.get("/mycourses" , authenticateUser , fetchmycourses , (req , res)=>{
    
    res.status(200).json({
        "message" : "successfully fetched your courses",
        "courses" : req.courses
    })
})

module.exports = router;


