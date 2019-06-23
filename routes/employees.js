const router = require('express').Router()
const {getAllEmployees, addEmployee, deleteEmployee, editEmployee, patrolCheckEmployee, getAllCheckedPatrol} = require('../Controllers/employeesController')

router.get('/', getAllEmployees)
router.post('/', addEmployee)
router.put('/:idEmployee', editEmployee)
router.delete('/:idEmployee', deleteEmployee)

router.get('/checkedPatrol', getAllCheckedPatrol)
router.post('/checkedPatrol/:idEmployee', patrolCheckEmployee)

module.exports = router