import { User, Blog, Sub, Message, Users } from "../models/DB";
import { Response, Request } from "express";
import sendEmailNew from "../models/sendNewSub";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;

///// Getting Blogs all
const get_blogs = async (req: Request, res: Response) => {
 const data = await Blog.find().sort({ createdAt: -1 });
 res.send(data);
};

///// Getting Single Blog
const get_single_blog = async (req: Request, res: Response) => {
 const blogData = await Blog.findById(req.params.id);
 res.send(blogData);
};
////// Posting Comment
const post_newComment = async (req: Request, res: Response) => {
 await Blog.updateOne(
  { _id: req.params.id },
  { $push: { comments: req.body } }
 );
 res.json({ message: "Succesfully Added Comment" }).status(200);
};

///// Making Like

const post_newLike = async (req: Request, res: Response) => {
 try {
  await Blog.updateOne(
   { _id: req.params.id },
   {
    likes: req.body.likes,
   }
  );
  res.json({ message: "Liked" });
 } catch (error) {
  console.log(error);
 }
};

///// Sending New Message

const post_newMessage = async (req: Request, res: Response) => {
 try {
  const newMessage = new Message(req.body);
  const creating = await Message.create(newMessage);
  res.send(creating);
 } catch (error) {
  console.log(error);
 }
};
///// Receiving a new sub
const post_newSub = async (req: Request, res: Response) => {
 try {
  const newSub = new Sub(req.body);
  const created = await Sub.create(newSub);
  await sendEmailNew(req.body.subscriber);
  res.send(created);
 } catch (error) {
  console.log(error);
 }
};

///// Creating a new User

const post_newUser = async (req: Request, res: Response) => {
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
};

//// Loging in a User

const post_Login = async (req: Request, res: Response) => {
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
  res.json({ message: "Successfully Login", open: "dashboard.html", token });
 } catch (error) {
  console.log(error);
 }
};
export {
 get_blogs,
 get_single_blog,
 post_newComment,
 post_newLike,
 post_newMessage,
 post_newSub,
 post_newUser,
 post_Login,
};
