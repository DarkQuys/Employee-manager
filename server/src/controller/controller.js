const bcrypt = require('bcrypt')
const upload = require('../server')
const db = require('../../models/index')
const jwt = require('jsonwebtoken')
const myTest = async (req, res) => {
    return res.send("heeheh") 
}
// const hashpass =  (password){
//     if (password) {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//             if (err) {
//                 return res.json('err')
//             }
            
//                 console.log(pass)
            
            
//             console.log(hash)
//        } )  
//     } 
// }
const createUser =  async(req, res) => {
   
    console.log(req.body)
   
    if (req.body.password ) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.json('err')
            }        
        console.log(hash)
         db.User.create({
        name: req.body.name, 
             email: req.body.email,
        salary : req.body.salary,
        password: hash, 
             address: req.body.address,
        image : req.file.filename
           })
       } )  
    } 
    return res.send('good') 
}
const createAdmin = async(req ,res) => {
    
    console.log(req.body)
   
    if (req.body.password ) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.json('err')
            }        
        console.log(hash)
         db.Admin.create({
        name: req.body.name, 
        email: req.body.email,

        password: hash, 
             address: req.body.address,
        image : req.file.filename
           })
       } )  
    } 
    return res.send('good') 
} 
const getAllUser = async(req , res) => {
    const allUser = await db.User.findAll({
            raw : true 
    })
    return res.json(allUser)
}
const testad = async(req, res) => {
    db.Admin.create({
        name :'quy'
    })
    return res.json('good')
}
const editUser = async (req, res) => {
    const userId =  req.params.id
    const user = await db.User.findOne({
        where : {id : userId}
    })
    return res.json( user )
} 
const updateUser = async(req ,res) => {
    const userId = req.params.id
    const user = await db.User.findOne({
        where : {id : userId }
    })
    if (user) {
        user.name = req.body.name,
            user.email = req.body.email, 
            user.salary = req.body.salary, 
            user.address = req.body.address, 
            user.image = req.file.filename,    
        await user.save()           
    }
    return res.send('hehe')
} 
const deleteUser = async(req ,res) => {
    const userId = req.params.id 
    const user =await db.User.findOne({ where: {id : userId} })
    if (user) {
       await user.destroy()
    }
    return res.send('delete done')
}
const handleLogin = async(req , res) => {
    const email1 = req.body.email 
    const password = req.body.password
    if (email1) {
        const user = await db.Admin.findOne({
            where: { email: email1 }
        })
        if (user) {
            if (password) {
                console.log(user.password)
                console.log(password)
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        console.log('err')
                    }
                    else if (result) { 
                        const id = user.id
                        const token = jwt.sign({ id , role : 'admin'}, "jwt-seccret-key", {
                            expiresIn : "30s"
                        })
                        console.log(token)
                        res.cookie('token', token)
                        
                        return res.json({ Result : 'good' })
                    }
                });
            }
            else {
                return res.json({ Result : 'huhu'})
            }
        }
        else {
            return res.json({ Result : 'huhu' })
        }
    }  //return res.json('huhu')
}
const handleLoginEmployee = async(req , res) => {
    const email1 = req.body.email 
    const password = req.body.password
    if (email1) {
        const user = await db.User.findOne({
            where: { email: email1 }
        })
        if (user) {
            if (password) {
                console.log(user.password)
                console.log(password)
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        console.log('err')
                    }
                    else if (result) { 
                        const id = user.id
                        const token = jwt.sign({ id : id , role : 'employee'}, "jwt-seccret-key", {
                            expiresIn : "30s"
                        })
                       
                        res.cookie('token', token)
                        console.log(req.cookies.token)
                        //console.log(req.cookies.tokenepl)

                        return res.json({ Result : 'good' , haha : req.cookies.token1 })
                    }
                });
            }
            else {
                return res.json({ Result : 'huhu'})
            }
        }
        else {
            return res.json({ Result : 'huhu' })
        }
    }  //return res.json('huhu')
}
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ERR : "Not token in cookies"})
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
              return res.json({ERR : "Token wrong"})
            }
            req.role = decoded.role
            next()    
        })
    }
    
}
const verifyEmployee = (req, res, next) => {
    const token = req.cookies.token
    //console.log(req.cookies.tokenepl)
    if (!token) {
        return res.json({ERR : "Not token in cookies"})
    }
    else {
        jwt.verify(token, "jwt-seccret-key", (err, decoded) => {
            if (err) {
              return res.json({ERR : "Token wrong"})
            } 
            req.id = decoded.id
            req.role = decoded.role
            next()    
        })
    }
}
const dashBoard = async (req, res) => {
    const role = req.role
    const id  = req.id
    return res.json({ Result: "good", role , id }) 
}
const logOut = async (req, res) => {
    res.clearCookie('token1')
    return res.json({Status : "nice"})
} 
const countUser = async(req ,res) => {
    const user = await db.User.count()
    const salary = await db.User.sum('salary')
    const adminn =  await db.Admin.count()
    return res.json({ employee : user , salary : salary , admin : adminn} )
}
const getUser = async (req, res) => {
    const id = req.params.id
    const user = await db.User.findOne({
        where : {id : id}
    })
    if (user) {
        return res.json(user)
    }
    else {
        return res.send('err')
    }
}
const getAdmin = async (req, res) => {
    const idA = req.params.id
    const ad = await db.Admin.findOne({
        where : {id : idA}
    })
    return res.json(ad)
}
 


module.exports = {
    myTest,
    createUser,
    getAllUser,
    editUser,
    updateUser,
    deleteUser,
    handleLogin, verifyUser,
    dashBoard,
    logOut,
    countUser,
    handleLoginEmployee,
    verifyEmployee,
    getUser,
    createAdmin,
    testad,
    getAdmin
}