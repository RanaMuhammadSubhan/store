const mongoose = require("mongoose");
const  UserDetailsScehma = new mongoose.Schema(
{
    username:String,
    email:{ type:String, unique:true },
    password:String,
    role: { type: String, default: "user" },
},
{
    collection: "Userinfo",
}
);

mongoose.model("UserInfo", UserDetailsScehma);
