const express=require("express");
const Authentication = require("../middlewares/Authenication");
const MessageController = require("../controllers/message-controller");
const router = express.Router();

router.post("/", Authentication.isAuthenticated, MessageController.sendMessage);

module.exports=router
