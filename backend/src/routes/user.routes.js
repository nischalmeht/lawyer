const express=require("express");
const router= express.Router();
const UserController=require("../controllers/user-controller")
router.post("/create",UserController.Create)
router.post("/login",UserController.login)
router.post("/logout",UserController.logout)

module.exports=router