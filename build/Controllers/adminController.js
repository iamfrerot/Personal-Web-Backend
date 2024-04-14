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
exports.AdDelete_blog = exports.AdUpdate_blog = exports.Adpost_newBlog = exports.Adget_messages = exports.AdDelete_message = exports.Adget_recentMessage = exports.Adget_recentBlog = exports.Adget_subs = exports.Adget_blog = void 0;
var app_1 = require("firebase/app");
var storage_1 = require("firebase/storage");
var DB_1 = require("../models/DB");
var newBlogSend_1 = __importDefault(require("../models/newBlogSend"));
var firebaseConfig = {
    apikey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDER,
    appId: process.env.APPID,
};
var fireApp = (0, app_1.initializeApp)(firebaseConfig);
var bucket = (0, storage_1.getStorage)(fireApp);
///// Getting a Single Blog
var Adget_blog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.findById(req.params.id)];
            case 1:
                blog = _a.sent();
                res.send(blog);
                return [2 /*return*/];
        }
    });
}); };
exports.Adget_blog = Adget_blog;
//// Getting recent Blogs
var Adget_recentBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.find().sort({ createdAt: -1 }).limit(5)];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); };
exports.Adget_recentBlog = Adget_recentBlog;
//// Getting Subscriber List
var Adget_subs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Sub.find().sort({ date: -1 })];
            case 1:
                subs = _a.sent();
                res.status(200).send(subs);
                return [2 /*return*/];
        }
    });
}); };
exports.Adget_subs = Adget_subs;
///// Getting recent Messages
var Adget_recentMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Message.find().sort({ date: -1 }).limit(5)];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); };
exports.Adget_recentMessage = Adget_recentMessage;
///// Getting all Messages
var Adget_messages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Message.find().sort({ date: -1 })];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); };
exports.Adget_messages = Adget_messages;
//// Posting new blog
var Adpost_newBlog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, image1, metadata1, image2, metadata2, blogImg1, blogImg2, image1url_1, image2url, newBlog, body_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                image1 = new Uint8Array(req.files[0].buffer);
                metadata1 = { contentType: req.files[0].mimetype };
                image2 = new Uint8Array(req.files[1].buffer);
                metadata2 = { contentType: req.files[1].mimetype };
                blogImg1 = (0, storage_1.ref)(bucket, "blogsImg/" + req.files[0].originalname);
                blogImg2 = (0, storage_1.ref)(bucket, "blogsImg/" + req.files[1].originalname);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, (0, storage_1.uploadBytes)(blogImg1, image1, metadata1)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, storage_1.uploadBytes)(blogImg2, image2, metadata2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, storage_1.getDownloadURL)(blogImg1)];
            case 4:
                image1url_1 = _a.sent();
                return [4 /*yield*/, (0, storage_1.getDownloadURL)(blogImg2)];
            case 5:
                image2url = _a.sent();
                newBlog = new DB_1.Blog({
                    title: data.title,
                    body: data.body,
                    subtitle: data.subtitle,
                    img1: image1url_1,
                    img2: image2url,
                });
                return [4 /*yield*/, DB_1.Blog.create(newBlog)];
            case 6:
                _a.sent();
                res.status(200).json({ message: "Posted Successful" });
                body_1 = data.body.split(" ")[0];
                DB_1.Sub.find().then(function (subs) {
                    subs.forEach(function (sub) {
                        (0, newBlogSend_1.default)(sub.subscriber, "🚀🚀New Blog🚀🚀", image1url_1, data.title, data.subtitle, body_1);
                    });
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.Adpost_newBlog = Adpost_newBlog;
//// Updating a blog
var AdUpdate_blog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image1url, image2url, data, image1, metadata1, blogImg1, image1, metadata1, image2, metadata2, blogImg1, blogImg2, response, blogbody_1, error_2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                data = req.body;
                if (!(((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) >= 1)) return [3 /*break*/, 3];
                image1 = new Uint8Array((_b = req === null || req === void 0 ? void 0 : req.files[0]) === null || _b === void 0 ? void 0 : _b.buffer);
                metadata1 = { contentType: (_c = req === null || req === void 0 ? void 0 : req.files[0]) === null || _c === void 0 ? void 0 : _c.mimetype };
                blogImg1 = (0, storage_1.ref)(bucket, "blogsImg/" + ((_d = req === null || req === void 0 ? void 0 : req.files[0]) === null || _d === void 0 ? void 0 : _d.originalname));
                return [4 /*yield*/, (0, storage_1.uploadBytes)(blogImg1, image1, metadata1)];
            case 1:
                _m.sent();
                return [4 /*yield*/, (0, storage_1.getDownloadURL)(blogImg1)];
            case 2:
                image1url = _m.sent();
                data.img1 = image1url;
                _m.label = 3;
            case 3:
                if (!(((_e = req.files) === null || _e === void 0 ? void 0 : _e.length) > 1)) return [3 /*break*/, 8];
                image1 = new Uint8Array((_f = req === null || req === void 0 ? void 0 : req.files[0]) === null || _f === void 0 ? void 0 : _f.buffer);
                metadata1 = { contentType: (_g = req === null || req === void 0 ? void 0 : req.files[0]) === null || _g === void 0 ? void 0 : _g.mimetype };
                image2 = new Uint8Array((_h = req === null || req === void 0 ? void 0 : req.files[1]) === null || _h === void 0 ? void 0 : _h.buffer);
                metadata2 = { contentType: (_j = req === null || req === void 0 ? void 0 : req.files[1]) === null || _j === void 0 ? void 0 : _j.mimetype };
                blogImg1 = (0, storage_1.ref)(bucket, "blogsImg/" + ((_k = req === null || req === void 0 ? void 0 : req.files[0]) === null || _k === void 0 ? void 0 : _k.originalname));
                blogImg2 = (0, storage_1.ref)(bucket, "blogsImg/" + ((_l = req === null || req === void 0 ? void 0 : req.files[1]) === null || _l === void 0 ? void 0 : _l.originalname));
                return [4 /*yield*/, (0, storage_1.uploadBytes)(blogImg1, image1, metadata1)];
            case 4:
                _m.sent();
                return [4 /*yield*/, (0, storage_1.uploadBytes)(blogImg2, image2, metadata2)];
            case 5:
                _m.sent();
                return [4 /*yield*/, (0, storage_1.getDownloadURL)(blogImg1)];
            case 6:
                image1url = _m.sent();
                return [4 /*yield*/, (0, storage_1.getDownloadURL)(blogImg2)];
            case 7:
                image2url = _m.sent();
                data.img1 = image1url;
                data.img2 = image2url;
                _m.label = 8;
            case 8:
                _m.trys.push([8, 10, , 11]);
                return [4 /*yield*/, DB_1.Blog.findByIdAndUpdate(req.params.id, data)];
            case 9:
                response = _m.sent();
                res.status(201).json({ message: "Succeessfully Updated ".concat(response === null || response === void 0 ? void 0 : response.title) });
                blogbody_1 = "".concat(data.body.split(" ")[0], "...");
                DB_1.Sub.find().then(function (subs) {
                    subs.forEach(function (sub) {
                        (0, newBlogSend_1.default)(sub.subscriber, "\uD83D\uDE80\uD83D\uDE80Update:".concat(data.title, "\uD83D\uDE80\uD83D\uDE80"), image1url, data.title, data.subtitle, blogbody_1);
                    });
                });
                return [3 /*break*/, 11];
            case 10:
                error_2 = _m.sent();
                console.log(error_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.AdUpdate_blog = AdUpdate_blog;
//// Deleting a blog
var AdDelete_blog = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Blog.deleteOne({ _id: req.params.id })];
            case 1:
                _a.sent();
                res
                    .status(202)
                    .json({ message: "Successfully Delete the blog", reload: req.url });
                return [2 /*return*/];
        }
    });
}); };
exports.AdDelete_blog = AdDelete_blog;
//// Deleting a message
var AdDelete_message = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DB_1.Message.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).json({ message: "Succefully Deleted the Message" });
                return [2 /*return*/];
        }
    });
}); };
exports.AdDelete_message = AdDelete_message;
