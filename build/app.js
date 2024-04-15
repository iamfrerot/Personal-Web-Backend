"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_session_1 = __importDefault(require("express-session"));
var mongoose_1 = __importDefault(require("mongoose"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cors_1 = __importDefault(require("cors"));
var guestsRoutes_1 = __importDefault(require("./routes/guestsRoutes"));
var adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 2000;
var DB_URI = process.env.DATABASE_URI;
var jwtSecret = process.env.JWT_SECRET;
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
mongoose_1.default.connect(DB_URI).then(function () {
    app.listen(PORT);
    console.log("Connected To Database Started to listen on PORT:".concat(PORT));
});
/// MiddleWares ////
// Allow requests from your frontend origin
app.use((0, cors_1.default)( /*{
 origin: "http://127.0.0.1:5501",
 credentials: true, // Allow cookies
 // allowedHeaders: ["Content-Type", "Authorization", " enctype"], // Allowed headers
 methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}*/));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
var sessionSec = process.env.SESSION_SECRET;
app.use((0, express_session_1.default)({
    secret: sessionSec,
    saveUninitialized: true,
    resave: false,
    store: connect_mongo_1.default.create({
        mongoUrl: DB_URI,
        ttl: 24 * 60 * 60,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
}));
var AuthorizationMiddleware = function (req, res, next) {
    var token = req.cookies.token;
    var authHeader = req.headers["authorization"];
    if (!token && !authHeader) {
        res.status(401).json({ message: "Unautholized User" });
        return false;
    }
    var tokenHeader = authHeader ? authHeader.split(" ")[1] : "No Header Autho";
    jsonwebtoken_1.default.verify(token, jwtSecret, function (errorToken, decodeToken) {
        if (errorToken) {
            jsonwebtoken_1.default.verify(tokenHeader, jwtSecret, function (error, decode) {
                if (error) {
                    res.status(401).json({ message: "Unautholized User" });
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    });
};
////////////// Routes /////////////
app.use("/api", guestsRoutes_1.default);
app.use("/admin", AuthorizationMiddleware, upload.any(), adminRoutes_1.default);
var info = {
    title: "My Brand API",
    version: "6.2.8",
    description: "This My Portfolio Website API",
};
var options = {
    definition: {
        info: info,
        openapi: "3.0.0",
        servers: [
            {
                url: "http://localhost:2000",
            },
        ],
        tags: [
            {
                name: "Guests",
                description: "Operations related to open Api's",
            },
            {
                name: "Auth $ Admin",
                description: "Operations related to autholized user",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
var spacs = (0, swagger_jsdoc_1.default)(options);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spacs));
