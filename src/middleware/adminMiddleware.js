const { adminModel, courseModel } = require('../model/userSchema')



const checkValidAdmin = async (req, res, next) => {
    try {

        const admin = req.body;

        if (!admin) throw new Error("admin data not found for creation");

        let exist = await adminModel.findOne({
            "username": admin.username
        })

        if (exist) throw new Error("admin is already exist");

        let newAdmin = new adminModel({
            "username": admin.username,
            "password": admin.password
        })

        await newAdmin.save();

        next();

    } catch (error) {


        console.log(error.message);
        res.status(403).json({
            "msg": "something went wrong while creating a new admin"
        })

    }
}

const adminExist = async (req, res, next) => {

    try {

        const admin = req.body;

        if (!admin) throw new Error("data not found for login");

        let exist = await adminModel.findOne({
            "username": admin.username,
            "password": admin.password
        })

        if (!exist) throw new Error("please provide valid credentials");

        next();


    } catch (error) {

        console.log(error.message);

        res.status(404).json({
            "message": error.message
        })
    }

}


const createCourse = async (req, res, next) => {
    try {

        const course = req.body;

        if (!course) throw new Error("course not found for insertion");

        let new_course = new courseModel({
            "title" : course.title,
            "description" : course.description,
            "price" : course.price,
            "imagelink" : course.imagelink
        })

        await new_course.save();

        let courseId = await courseModel.findOne({
            "title" : course.title
        })

        console.log(courseId)

        await adminModel.updateOne({ "_id" : req.adminId },
            {
                $push: {
                    "courseCreated": courseId._id
                }
            }
        )

        next();

    } catch (error) {
        console.log(error.message+" createCourse");
        
        res.status(403).json({
            "message": error.message
        })
    }
}


const fetchCreatedCourses = async ( req , res , next )=>{
    try {
        
        const adminId = req.adminId;

        const coursesCreated = await adminModel.find({ "_id" : adminId } , { "courseCreated" : 1 }).populate("courseCreated");

        console.log(coursesCreated[0].courseCreated);

        req.coursesFound = coursesCreated[0].courseCreated;

        next();

    } catch (error) {
        console.log(error.message+" fetchCreatedCourses");

        res.status(403).json({
            "message" : error.message
        })

    }
}




module.exports = { checkValidAdmin, adminExist, createCourse , fetchCreatedCourses }


