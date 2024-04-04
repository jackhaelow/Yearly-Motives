import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";





const port = env.Port;

mongoose.connect(process.env.Mongo_Connection_String!)
.then(()=>{
   console.log("Mongoose connected");
   app.listen(port,()=>{
    console.log("server running on port:"+ port);
  });
})
.catch(console.error);
