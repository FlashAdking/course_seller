const mongoose = require('mongoose')

require('dotenv').config()


mongoose.connect( process.env.MONGO_URI ?? null);

const UserSchema = new mongoose.Schema({

    "username" : String,
    "password" : String,
    "courses" : [
        {
            "type" : mongoose.Schema.Types.ObjectId,
            "ref" : 'courses'
        }
    ]

})


const adminSchema = new mongoose.Schema({
    "username" : String,
    "passoword" : String,
    "courseCreated" : [
        {
            "type" : mongoose.Schema.Types.ObjectId,
            "ref" : "courses"
        }
    ]
})


const courseSchema = new mongoose.Schema({
    "title": String,
    "description" : String,
    "price" : Number
})


const userModel = new mongoose.model('users' , UserSchema);

const adminModel = new mongoose.model('admin' , adminSchema);

const courseModel = new mongoose.model('courses' , courseSchema);


module.exports = { userModel , adminModel , courseModel };
