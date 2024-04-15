require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";
import multer from "multer";
import cookierParser from "cookie-parser";
import jwt from "jsonwebtoken";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import guestsRoutes from "./routes/guestsRoutes";
import adminRoutes from "./routes/adminRoutes";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();
const PORT: number | string = process.env.PORT || 2000;
const DB_URI = process.env.DATABASE_URI as string;
const jwtSecret = process.env.JWT_SECRET as string;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(DB_URI).then(() => {
 app.listen(PORT);
 console.log(`Connected To Database Started to listen on PORT:${PORT}`);
});

/// MiddleWares ////

// Allow requests from your frontend origin
app.use(
 cors(/*{
  origin: "http://127.0.0.1:5501",
  credentials: true, // Allow cookies
  // allowedHeaders: ["Content-Type", "Authorization", " enctype"], // Allowed headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
 }*/)
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookierParser());
const sessionSec = process.env.SESSION_SECRET as string | string[];
app.use(
 session({
  secret: sessionSec,
  saveUninitialized: true,
  resave: false,
  store: MongoStore.create({
   mongoUrl: DB_URI,
   ttl: 24 * 60 * 60,
  }),
  cookie: {
   maxAge: 1000 * 60 * 60,
  },
 })
);
const AuthorizationMiddleware = (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const token: string | undefined = req.cookies.token as string;
 const authHeader: string | undefined = req.headers["authorization"] as string;

 if (!token && !authHeader) {
  res.status(401).json({ message: "Unautholized User" });
  return false;
 }
 const tokenHeader = authHeader ? authHeader.split(" ")[1] : "No Header Autho";
 jwt.verify(token, jwtSecret, (errorToken, decodeToken) => {
  if (errorToken) {
   jwt.verify(tokenHeader, jwtSecret, (error, decode) => {
    if (error) {
     res.status(401).json({ message: "Unautholized User" });
    } else {
     next();
    }
   });
  } else {
   next();
  }
 });
};
////////////// Routes /////////////

app.use("/api", guestsRoutes);
app.use("/admin", AuthorizationMiddleware, upload.any(), adminRoutes);

const info: swaggerJSDoc.Information = {
 title: "My Brand API",
 version: "6.2.8",
 description: "This My Portfolio Website API",
};
const options: Options = {
 definition: {
  info,
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

const spacs = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spacs));
