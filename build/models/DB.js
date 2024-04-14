"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Sub = exports.Blog = exports.User = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    img1: {
        type: String,
        required: true,
    },
    img2: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
var SubsSChema = new mongoose_1.Schema({
    subscriber: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
var MessageSchema = new mongoose_1.Schema({
    guest: {
        type: String,
        required: true,
    },
    guestemail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
var User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
var Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.Blog = Blog;
var Sub = mongoose_1.default.model("Sub", SubsSChema);
exports.Sub = Sub;
var Message = mongoose_1.default.model("Message", MessageSchema);
exports.Message = Message;
