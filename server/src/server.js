const express = require('express')
const app = express()
const port = 3003
const initWebRoutes = require('./router/web')
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
app.use(cors({
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  //optionSuccessStatus:200
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
initWebRoutes(app) 

app.use(express.static('public'))
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
// module.exports = {
//   upload,
// storage}
const sequelize = new Sequelize('mydatabase', 'root', null, {
  host: 'localhost',
  dialect:  'mysql'
})

const connectDb = async() => {
  try {
    await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}
connectDb()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})