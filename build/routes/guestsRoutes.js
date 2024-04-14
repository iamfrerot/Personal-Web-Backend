"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var guestsContoller_1 = require("../Controllers/guestsContoller");
var app = (0, express_1.default)();
var router = express_1.default.Router();
////// Get requests
router.get("/blogs", guestsContoller_1.get_blogs);
router.get("/blog/:id", guestsContoller_1.get_single_blog);
//// Post requests
router.post("/comment/new/:id", guestsContoller_1.post_newComment);
router.post("/like/new/:id", guestsContoller_1.post_newLike);
router.post("/message/new", guestsContoller_1.post_newMessage);
router.post("/sub/new", guestsContoller_1.post_newSub);
router.post("/user/new", guestsContoller_1.post_newUser);
router.post("/user/login", guestsContoller_1.post_Login);
exports.default = router;
