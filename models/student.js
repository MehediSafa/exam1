const mongoose = require('mongoose')
const {Schema} = mongoose

const studentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },

    isActive: {
        type: Boolean,
        default:true

    },
    enrolledCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course',
            default:[],
        },
        {
            timeStamps: true,
        }
    ]
})


module.exports = mongoose.model('Student',studentSchema)