// import express
const express = require('express')

// create router for express
const router = new express.Router()

// import multer
const upload = require('../multerConfig/storageConfig')


// import controller
const userController = require('../controller/userController')

// define router for each http request
router.post('/employee/register',upload.single('user-profile'),userController.register)

// define route for get all request
router.get('/employee/get-all-employee-details',userController.getusers)

// define routes for view-profile
router.get('/employee/view-profile/:id',userController.viewprofile)

// define route for delete
router.delete('/employee/delete-user/:id',userController.deletetUser)

// define route to update user
router.put('/employee/update/:id',upload.single('user_profile'),userController.editUser)


// EXPORT ROUTER
module.exports = router