"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_Login = exports.post_newUser = exports.post_newSub = exports.post_newMessage = exports.post_newLike = exports.post_newComment = exports.get_single_blog = exports.get_blogs = void 0;
var DB_1 = require("../models/DB");
var sendNewSub_1 = __importDefault(require("../models/sendNewSub"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecret = process.env.JWT_SECRET;
///// Getting Blogs all
var get_blogs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.find().sort({ createdAt: -1 })];
            case 1:
                data = _a.sent();
                res.send(data);
                return [2 /*return*/];
        }
    });
}); };
exports.get_blogs = get_blogs;
///// Getting Single Blog
var get_single_blog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.findById(req.params.id)];
            case 1:
                blogData = _a.sent();
                res.send(blogData);
                return [2 /*return*/];
        }
    });
}); };
exports.get_single_blog = get_single_blog;
////// Posting Comment
var post_newComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.updateOne({ _id: req.params.id }, { $push: { comments: req.body } })];
            case 1:
                _a.sent();
                res.json({ message: "Succesfully Added Comment" }).status(200);
                return [2 /*return*/];
        }
    });
}); };
exports.post_newComment = post_newComment;
///// Making Like
var post_newLike = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, DB_1.Blog.updateOne({ _id: req.params.id }, {
                        likes: req.body.likes,
                    })];
            case 1:
                _a.sent();
                res.json({ message: "Liked" });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.post_newLike = post_newLike;
///// Sending New Message
var post_newMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newMessage, creating, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newMessage = new DB_1.Message(req.body);
                return [4 /*yield*/, DB_1.Message.create(newMessage)];
            case 1:
                creating = _a.sent();
                res.send(creating);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.post_newMessage = post_newMessage;
///// Receiving a new sub
var post_newSub = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newSub, created, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newSub = new DB_1.Sub(req.body);
                return [4 /*yield*/, DB_1.Sub.create(newSub)];
            case 1:
                created = _a.sent();
                return [4 /*yield*/, (0, sendNewSub_1.default)(req.body.subscriber)];
            case 2:
                _a.sent();
                res.send(created);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.post_newSub = post_newSub;
///// Creating a new User
var post_newUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, hashedPassword, user, error_4, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, DB_1.User.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                user = _b.sent();
                res
                    .status(201)
                    .json({ message: "User Created Successfully", open: "login.html" });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                if (error_4.code === 11000) {
                    res.status(409).json({
                        message: "User already in Use Provide a unique Username and Email",
                    });
                }
                else {
                    res.status(500).json({ message: "Internal Server Error" });
                }
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _b.sent();
                console.log(error_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.post_newUser = post_newUser;
//// Loging in a User
var post_Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, isPasswordValid, token, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, DB_1.User.findOne({
                        username: username,
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid Credentials" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid Credentials" })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
                    expiresIn: "1day",
                });
                res.cookie("token", token);
                res.json({ message: "Successfully Login", open: "dashboard.html", token: token });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.post_Login = post_Login;
