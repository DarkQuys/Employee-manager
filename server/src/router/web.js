const express = require('express')
const multer = require('multer')
const router = express.Router()
//const uploadd = require('../server')
const controller = require('../controller/controller')
const path = require('path')
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null , 'public/images')
    } ,
    filename: (req, file, cb) => {
      cb(null , file.fieldname + "_"+ Date.now()+path.extname(file.originalname))
    }
  })
const upload = multer({
    storage : storage
  })
let initWebRoutes = (app) => {
  router.get('/', controller.myTest)
  router.get('/test',controller.testad)
  router.post('/create', upload.single('image'), controller.createUser)
  router.post('/createadmin', upload.single('image'), controller.createAdmin)
  router.get('/alluser', controller.getAllUser)
  router.put('/edituser/:id', controller.editUser)
  router.post('/updateuser/:id', upload.single('image'), controller.updateUser)
  router.delete('/deleteuser/:id', controller.deleteUser)
  router.post('/login', controller.handleLogin)
  router.get('/dashboard' ,controller.verifyEmployee , controller.dashBoard)
  router.get('/logout', controller.logOut)
  router.get('/countUser', controller.countUser)
  router.post('/loginemployee', controller.handleLoginEmployee)
  router.get('/getuser/:id', controller.getUser)
  router.get('/getadmin/:id', controller.getAdmin)
  
    return app.use('/' ,router )
}
module.exports = initWebRoutes