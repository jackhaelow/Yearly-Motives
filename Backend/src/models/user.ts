import { InferSchemaType, Schema, model } from "mongoose";

const userSchemer = new Schema({
 username :{type : String, required: true,unique: true},
 email :{type : String, required: true,unique: true,select:false},
 password :{type : String, required: true},
});

type User = InferSchemaType<typeof userSchemer>;

export default model<User>("User",userSchemer);

