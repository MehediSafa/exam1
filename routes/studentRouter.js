const express = require('express')
const router = express.Router()

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');


router.post('/',createStudent)
router.get('/',getAllSttudents)
router.get('/:id',getStudendById)
router.patch('/:id',updateStudent)
router.delete('/:id',deleteStudent)

module.express = router

