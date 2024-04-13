import mongoose, { Document, Model, Schema } from "mongoose";

interface Blogs extends Document {
 title: String;
 subtitle: String;
 body: String;
 img1: String;
 img2: String;
 likes: Number;
 comments: Object;
 createdAt: Date;
}
interface Users extends Document {
 username: string;
 email: string;
 password: string;
}
interface Subs extends Document {
 subscriber: string;
 date: Date;
}
interface Messages extends Document {
 guest: String;
 guestemail: String;
 message: String;
 date: Date;
}

const BlogSchema: Schema<Blogs> = new Schema({
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
const UserSchema: Schema<Users> = new Schema({
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
const SubsSChema: Schema<Subs> = new Schema({
 subscriber: {
  type: String,
  required: true,
 },
 date: {
  type: Date,
  default: Date.now,
 },
});
const MessageSchema: Schema<Messages> = new Schema({
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
const User: Model<Users> = mongoose.model("User", UserSchema);
const Blog: Model<Blogs> = mongoose.model("Blog", BlogSchema);
const Sub: Model<Subs> = mongoose.model("Sub", SubsSChema);
const Message: Model<Messages> = mongoose.model("Message", MessageSchema);
export { User, Blog, Sub, Message, Users };
