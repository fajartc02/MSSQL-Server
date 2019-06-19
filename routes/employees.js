const router = require('express').Router()
const {getAllEmployees, addEmployee, deleteEmployee, editEmployee} = require('../Controllers/employeesController')

router.get('/', getAllEmployees)
router.post('/', addEmployee)
router.put('/:idEmployee', editEmployee)
router.delete('/:idEmployee', deleteEmployee)

module.exports = router