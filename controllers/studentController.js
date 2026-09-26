const mongoose = require('mongoose')
const Student = require('../models/student.js')


const createStudent = async (req,res) => {
    try {
         const { name, email, phone, age, isActive, enrolledCourses} = req.body 

    //empty field check

    if (!name || !email || !phone || !age) {
        return res.status(400).json({
        success: false,
        message: 'name, email, phone and age are required and cannot be empty',
      })
    }

    //check age

    if(age < 18){
        return res.status(400).json({
            success:false,
            message:"Student age must be ove 18"
        })
    }

    //check email

    let existingUser = await Student.findOne({email:email})
    if(existingUser){
        return res.status(400).json({
            success:false,
            message: "A stident with this email already exists"
        })
    }



    //databse created
    const student = await Student.create({
        name:name,
        email:email,
        phone:phone,
        age:age,
        isActive:isActive,
        enrolledCourses:enrolledCourses,
    })

    res.status(201).json({
        success:true,
        message:"studend created successfully",
        data:student
    })

    } catch(error) {
       if(error.code === 11000){
            return res.status(409).json({
                success:false,
                message:'A student with this email already exists '
            })
       }

       res.status(500).json({
        success:false,
        message: error.message
       })
    }

    

}


//read 

const getAllStudents = async (req,res) =>{

    try{
        const students = await Student.find()

        return res.status(200).json({
            success:true,
            count:students.length,
            data:students
        })
    }catch(error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }

}


// GET single student by id (with populated course info)
// GET /api/students/:id

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student id',
      });
    }

    const student = await Student.findById(id).populate('enrolledCourses');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE a student
// PATCH /api/students/:id

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student id',
      });
    }

    // Check for empty values on fields the user is trying to update
    const { name, email, phone, age } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ success: false, message: 'name cannot be empty' });
    }
    if (email !== undefined && !email.trim()) {
      return res.status(400).json({ success: false, message: 'email cannot be empty' });
    }
    if (phone !== undefined && !phone.trim()) {
      return res.status(400).json({ success: false, message: 'phone cannot be empty' });
    }

    // Rule: age must be 18 or above (only check if age is being updated)
    if (age !== undefined && (age === '' || age < 18)) {
      return res.status(400).json({
        success: false,
        message: 'Student must be at least 18 years old',
      });
    }

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteStudent = async (req,res) => {
    try{
        const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return rest.status(400).json({
            success:false,
            message: 'invalid studend id'
        })

        const student = await Student.findById({id})

         if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }


    if (student.enrolledCourses.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete student. Student is enrolled in one or more courses',
      });
    }

    await Student.findByIdAndDelete(id);

    res.staus(200).json({
        success:true,
        message:'student deleted successfully'
    })


    }
    } catch(error){
        res.status(500).json({
      success: false,
      message: error.message,
    })
    }
}


module.exports = {createStudent,getAllStudents,getStudentById,updateStudent}