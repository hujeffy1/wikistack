const router = require("express").Router()
const Sequelize = require('sequelize');
const db = require("../models")
const {addPage} = require("../views")

router.get("/",function(req,res,next){
res.send("Hello How are you?")
})

router.post("/",async function(req,res,next){
  console.log(req.body)
  const {name,email,title,content,status} = req.body
  try{
   const page = await Page.create({
    title:title,
    content:content,
    status:status
   })
   const user = await User.create({
     name:name,
     email:email
   })
   res.redirect("/")
  }catch (error){
    next(error)
  }
})

router.get("/add",function(req,res,next){
  res.send(addPage())
})


module.exports = router
