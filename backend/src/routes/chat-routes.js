const express=require("express");
const router= express.Router();
const ChatController=require("../controllers/chat-controller");
const Authentication = require("../middlewares/Authenication");
router.post("/message",Authentication.isAuthenticated,ChatController.sendMessage)
router.get("/chat/all",Authentication.isAuthenticated,ChatController.getAllChats)
router.post("/chat/new",Authentication.isAuthenticated,ChatController.createNewChat)
router.get("/message/:chatId",Authentication.isAuthenticated,ChatController.getMessagesByChat)


module.exports=router