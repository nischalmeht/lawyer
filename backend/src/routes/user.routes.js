const express=require("express");
const router= express.Router();
const UserController=require("../controllers/user-controller");
const Authentication = require("../middlewares/Authenication");
router.post("/create",UserController.Create)
router.post("/login",UserController.login)
router.post("/logout",UserController.logout)
router.get("/get-all-lawyers",Authentication.isAuthenticated,UserController.getAllLawyers)

module.exports=router