require("dotenv").config();
import express, {
 Express,
 NextFunction,
 Request,
 Response,
 response,
} from "express";
import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import multer from "multer";
import cookierParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import session from "express-session";
import mongoose, { Error } from "mongoose";
import MongoStore from "connect-mongo";
import { User, Blog, Sub, Message, Users } from "./models/DB";
import cors from "cors";
import sendEmailNew from "./models/sendNewSub";
import newBlogSendMail from "./models/newBlogSend";

const firebaseConfig = {
 apikey: process.env.APIKEY,
 authDomain: process.env.AUTHDOMAIN,
 projectId: process.env.PROJECTID,
 storageBucket: process.env.STORAGEBUCKET,
 messagingSenderId: process.env.MESSAGINGSENDER,
 appId: process.env.APPID,
};
const app: Express = express();
const fireApp = initializeApp(firebaseConfig);
const bucket = getStorage(fireApp);
const PORT: number | string = process.env.PORT || 2000;
const DB_URI = process.env.DATABASE_URI as string;
const jwtSecret = process.env.JWT_SECRET as string;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(`${DB_URI}`).then(() => {
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
   mongoUrl: process.env.DATABASE_URI,
   ttl: 24 * 60 * 60,
  }),
  cookie: {
   maxAge: 1000 * 60 * 60,
  },
 })
);

////////////// Routes /////////////

// Get req //

///// Geting Blogs
app.get("/api/blogs", async (req: Request, res: Response) => {
 const data = await Blog.find().sort({ createdAt: -1 });
 res.send(data);
});

////// Getting Single Blog Page

app.get("/api/blog/:id", async (req: Request, res: Response) => {
 const blogData = await Blog.findById(req.params.id);
 res.send(blogData);
});

// Post req //

/// Adding new Comment

app.post("/comment/new/:id", async (req: Request, res: Response) => {
 await Blog.updateOne(
  { _id: req.params.id },
  { $push: { comments: req.body } }
 );
});
//// Adding Like
app.post("/like/:id", async (req: Request, res: Response) => {
 try {
  await Blog.updateOne(
   { _id: req.params.id },
   {
    likes: req.body.likes,
   }
  );
 } catch (error) {
  console.log(error);
 }
});
/// receiving message from contact form
app.post("/api/message", async (req: Request, res: Response) => {
 try {
  const newMessage = new Message(req.body);
  const creating = await Message.create(newMessage);
  res.send(creating);
 } catch (error) {
  console.log(error);
 }
});
/// Receiving A sub from sub form
app.post("/api/sub", async (req: Request, res: Response) => {
 try {
  const newSub = new Sub(req.body);
  const created = await Sub.create(newSub);
  await sendEmailNew(req.body.subscriber);
  res.send(created);
 } catch (error) {
  console.log(error);
 }
});

/// Creating a user

app.post("/api/user", async (req: Request, res: Response) => {
 try {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
   const user = await User.create({
    username,
    email,
    password: hashedPassword,
   });
   res
    .status(201)
    .json({ message: `User Created Successfully`, open: "login.html" });
  } catch (error: any) {
   if (error.code === 11000) {
    res.status(409).json({
     message: "User already in Use Provide a unique Username and Email",
    });
   } else {
    res.status(500).json({ message: "Internal Server Error" });
   }
  }
 } catch (error) {
  console.log(error);
 }
});

/// Loging in a user

app.post("/html/dashboard", async (req: Request, res: Response) => {
 try {
  const { username, password } = req.body;
  const user: Users | null = await User.findOne({
   username,
  });
  if (!user) {
   return res.status(401).json({ message: "Invalid Credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
   return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret, {
   expiresIn: "1day",
  });
  res.cookie("token", token);
  res.json({ message: "Success Login", open: "dashboard.html", token });
 } catch (error) {
  console.log(error);
 }
});

//////// Admin //////

/// Verifying user logied in middleware

const AuthorizationMiddleware = (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const token: string = req.cookies.token;
 if (!token) {
  res.status(401).json({ message: "Unautholized User" });
  return false;
 }
 try {
  const verified = jwt.verify(token, jwtSecret);
  next();
 } catch (error) {
  res.status(401).json({ message: "Unautholized User" });
 }
};
// Creating a blog
app.post("/api/blog", upload.any(), async (req: Request, res: Response) => {
 const data = req.body;
 const image1 = new Uint8Array((req as any).files[0].buffer);
 const metadata1 = { contentType: (req as any).files[0].mimetype };
 const image2 = new Uint8Array((req as any).files[1].buffer);
 const metadata2 = { contentType: (req as any).files[1].mimetype };
 const blogImg1 = ref(bucket, "blogsImg/" + (req as any).files[0].originalname);
 const blogImg2 = ref(bucket, "blogsImg/" + (req as any).files[1].originalname);

 try {
  await uploadBytes(blogImg1, image1, metadata1);
  await uploadBytes(blogImg2, image2, metadata2);
  const image1url = await getDownloadURL(blogImg1);
  const image2url = await getDownloadURL(blogImg2);
  const newBlog = new Blog({
   title: data.title,
   body: data.body,
   subtitle: data.subtitle,
   img1: image1url,
   img2: image2url,
  });
  await Blog.create(newBlog);
  res.status(200).json({ message: "Posted Successful" });
  const body = data.body.split(" ")[0];
  Sub.find().then((subs) => {
   subs.forEach((sub) => {
    newBlogSendMail(
     sub.subscriber,
     "🚀🚀New Blog🚀🚀",
     image1url,
     data.title,
     data.subtitle,
     body
    );
   });
  });
 } catch (error) {
  console.log(error);
 }
});

// Deleting a blog

app.delete("/api/blog/:id", async (req: Request, res: Response) => {
 await Blog.deleteOne({ _id: req.params.id });
 res
  .status(202)
  .json({ message: "Successfully Delete the blog", reload: req.url });
});

//// Admin Updating a blog
app.put("/api/blog/:id", upload.any(), async (req: Request, res: Response) => {
 let image1url: string;
 let image2url;
 const data = req.body;
 if ((req as any).files?.length >= 1) {
  const image1 = new Uint8Array((req as any)?.files[0]?.buffer);
  const metadata1 = { contentType: (req as any)?.files[0]?.mimetype };
  const blogImg1 = ref(
   bucket,
   "blogsImg/" + (req as any)?.files[0]?.originalname
  );
  await uploadBytes(blogImg1, image1, metadata1);
  image1url = await getDownloadURL(blogImg1);
  data.img1 = image1url;
 }
 if ((req as any).files?.length > 1) {
  const image1 = new Uint8Array((req as any)?.files[0]?.buffer);
  const metadata1 = { contentType: (req as any)?.files[0]?.mimetype };
  const image2 = new Uint8Array((req as any)?.files[1]?.buffer);
  const metadata2 = { contentType: (req as any)?.files[1]?.mimetype };
  const blogImg1 = ref(
   bucket,
   "blogsImg/" + (req as any)?.files[0]?.originalname
  );
  const blogImg2 = ref(
   bucket,
   "blogsImg/" + (req as any)?.files[1]?.originalname
  );
  await uploadBytes(blogImg1, image1, metadata1);
  await uploadBytes(blogImg2, image2, metadata2);
  image1url = await getDownloadURL(blogImg1);
  image2url = await getDownloadURL(blogImg2);
  data.img1 = image1url;
  data.img2 = image2url;
 }
 try {
  const response = await Blog.findByIdAndUpdate(req.params.id, data);
  res.status(201).json({ message: `Succeessfully Updated ${response?.title}` });
  const blogbody = data.body.split(" ")[0];
  Sub.find().then((subs) => {
   subs.forEach((sub) => {
    newBlogSendMail(
     sub.subscriber,
     `🚀🚀Update:${data.title}🚀🚀`,
     image1url,
     data.title,
     data.subtitle,
     blogbody
    );
   });
  });
 } catch (error) {
  console.log(error);
 }
});

///// Admin getting all blogs

app.get("/admin/blogs", async (req: Request, res: Response) => {
 const blogs = await Blog.find().sort({ createdAt: 1 });
 res.send(blogs).status(200);
});

//// Admin get blogs recent

app.get("/admin/blogsre", async (req: Request, res: Response) => {
 const data = await Blog.find().sort({ createdAt: 1 }).limit(5);
 res.status(200).send(data);
});

//// Admin getting message recent

app.get("/admin/messagesre", async (req: Request, res: Response) => {
 const data = await Message.find().sort({ date: -1 }).limit(5);
 res.status(200).send(data);
});

//// Admin getting all messages

app.get("/admin/messages", async (req: Request, res: Response) => {
 const data = await Message.find().sort({ date: -1 });
 res.status(200).send(data);
});

///// Admin deleting a Message

app.delete("/admin/delete/message/:id", async (req: Request, res: Response) => {
 await Message.findByIdAndDelete(req.params.id);
 res.status(200).json({ message: "Succefully Deleted the Message" });
});

//// admin getting Sublist

app.get("/admin/sub", async (req: Request, res: Response) => {
 const subs = await Sub.find().sort({ data: -1 });
 res.status(200).send(subs);
});

//// Adming Get single Blog
app.get("/admin/blog/:id", async (req: Request, res: Response) => {
 const blog = await Blog.findById(req.params.id);
 res.send(blog);
});
