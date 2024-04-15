import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Blog, Sub, Message } from "../models/DB";
import { Response, Request } from "express";
import newBlogSendMail from "../models/newBlogSend";

const firebaseConfig = {
 apikey: process.env.APIKEY,
 authDomain: process.env.AUTHDOMAIN,
 projectId: process.env.PROJECTID,
 storageBucket: process.env.STORAGEBUCKET,
 messagingSenderId: process.env.MESSAGINGSENDER,
 appId: process.env.APPID,
};
const fireApp = initializeApp(firebaseConfig);
const bucket = getStorage(fireApp);

///// Getting a Single Blog

const Adget_blog = async (req: Request, res: Response) => {
 const blog = await Blog.findById(req.params.id);
 res.send(blog);
};

//// Getting recent Blogs

const Adget_recentBlog = async (req: Request, res: Response) => {
 const data = await Blog.find().sort({ createdAt: -1 }).limit(5);
 res.status(200).send(data);
};

//// Getting Subscriber List

const Adget_subs = async (req: Request, res: Response) => {
 const subs = await Sub.find().sort({ date: -1 });
 res.status(200).send(subs);
};

///// Getting recent Messages

const Adget_recentMessage = async (req: Request, res: Response) => {
 const data = await Message.find().sort({ date: -1 }).limit(5);
 res.status(200).send(data);
};

///// Getting all Messages

const Adget_messages = async (req: Request, res: Response) => {
 const data = await Message.find().sort({ date: -1 });
 res.status(200).send(data);
};

//// Posting new blog

const Adpost_newBlog = async (req: Request, res: Response) => {
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
  res.status(200).json({ message: "Posted Successfully" });
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
};

//// Updating a blog

const AdUpdate_blog = async (req: Request, res: Response) => {
 let image1url: string;
 let image2url: string;
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
  const blogbody = `${data.body.split(" ")[0]}...`;
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
};

//// Deleting a blog

const AdDelete_blog = async (req: Request, res: Response) => {
 await Blog.deleteOne({ _id: req.params.id });
 res.status(202).json({ message: "Successfully Delete the blog" });
};

//// Deleting a message

const AdDelete_message = async (req: Request, res: Response) => {
 await Message.findByIdAndDelete(req.params.id);
 res.status(200).json({ message: "Succefully Deleted the Message" });
};

export {
 Adget_blog,
 Adget_subs,
 Adget_recentBlog,
 Adget_recentMessage,
 AdDelete_message,
 Adget_messages,
 Adpost_newBlog,
 AdUpdate_blog,
 AdDelete_blog,
};
