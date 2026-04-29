const { userModel, courseModel } = require("../model/userSchema")


// check user already exist for signup
const validUser = async (req , res , next )=>{
    
    try {
        
        const usr = req.body;
        
        if(!usr) throw new Error("user not found while registration");

        const exist = await userModel.findOne({
            username : usr.username
        })


        if(exist) throw new Error("user is already present");

        let newUsr = new userModel({
            "username" : usr.username,
            "password" : usr.password
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

const userExist = async (req ,res , next )=>{
    try {
        
        let user = req.body;

        if(!user) throw new Error("user not found while user login");
        
        let exist = await userModel.findOne({
            "username" : user.username,
            "password" : user.password
        })
        

        console.log(exist)

        if(!exist) throw new Error("user not registered");

        next();

    } catch (error) {
        
        console.log(error.message);

        res.status(403).json({
            "message" : error.message
        })
    }
}

const fetchCourses = async (req , res , next)=>{
    try {
        
        const courses = await courseModel.find({});
        req.courses = courses;

        next();

    } catch (error) {
        console.log(error.message)

        res.status(403).json({
            "message" : error.message
        })
    }
}

const purchaseCourse = async (req , res , next )=>{
    try {
        
        const course = req.params.courseId;

        if(!course) throw new Error("courseId not found for purchase course");

        await userModel.updateOne({ "_id" : req.userId } , {
            $push : {
                "courses" : course
            }
        })

        req.course = await courseModel.findOne({ "_id" : course })

        next();

    } catch (error) {

        console.log(error.message);

        res.status(403).json({
            "message" : error.message
        })

    }
}

const fetchmycourses = async (req , res , next)=>{
    try {
        const userId = req.userId;

        if(!userId) throw new Error("userId not found while fetching bought courses");

        const courses = await userModel.find( { "_id" : userId } , { courses : 1 } ).populate('courses');

        req.courses = courses;

        next()
        
    } catch (error) {
        
        console.log(error.message);

        res.status(403).json({
            "message" : error.message
        })

    }
}


module.exports = { validUser  , userExist , fetchCourses , purchaseCourse , fetchmycourses }; 