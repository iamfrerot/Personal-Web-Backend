require("dotenv").config();
import express, { Express, Router } from "express";
import {
 get_blogs,
 get_single_blog,
 post_newComment,
 post_newLike,
 post_newMessage,
 post_newSub,
 post_newUser,
 post_Login,
} from "../Controllers/guestsContoller";

const app: Express = express();
const router: Router = express.Router();

////// Get requests

router.get("/blogs", get_blogs);
router.get("/blog/:id", get_single_blog);

//// Post requests
router.post("/comment/new/:id", post_newComment);
router.post("/like/new/:id", post_newLike);
router.post("/message/new", post_newMessage);
router.post("/sub/new", post_newSub);
router.post("/user/new", post_newUser);
router.post("/user/login", post_Login);
export default router;
