require("dotenv").config();
import express, { Express, Router } from "express";
import {
 Adpost_newBlog,
 AdDelete_blog,
 AdUpdate_blog,
 Adget_recentBlog,
 Adget_recentMessage,
 Adget_messages,
 AdDelete_message,
 Adget_subs,
 Adget_blog,
} from "../Controllers/adminController";
import { get_blogs } from "../Controllers/guestsContoller";

const app: Express = express();
const router: Router = express.Router();

router.get("/blog/:id", Adget_blog);
router.get("/subs", Adget_subs);
router.get("/blogs", get_blogs);
router.get("/blogsre", Adget_recentBlog);
router.get("/messages", Adget_messages);
router.get("/messagesre", Adget_recentMessage);
router.post("/blog/new", Adpost_newBlog);
router.put("/blog/update/:id", AdUpdate_blog);
router.delete("/blog/delete/:id", AdDelete_blog);
router.delete("/message/delete/:id", AdDelete_message);
export default router;
