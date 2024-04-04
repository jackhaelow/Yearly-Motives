import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env,{
    Mongo_Connection_String :str(),
    Port: port(),
    SESSION_SECRET :str(),
})