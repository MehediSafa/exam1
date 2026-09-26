const mongoose = require('mongoose')
const Student = require('../models/student.js')


const createStudent = async (req,res) => {
    const { name, email, phone, age, isActive, enrolledCourses} = req.body 

}

module.exports createStudent