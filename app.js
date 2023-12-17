const express = require("express");
const app = express();
const router = express.Router();
const path = require('path'); // Import the path module

const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET ='hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';
const mongoUrl = process.env.DATABASE_URL;
app.use(express.static('uploads'));
// Connect to the MongoDB database using the DATABASE_URL environment variable
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(cors());
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })

  .catch((e) => console.log(e));
app.use(express.json());
//
require("./userdetails");
const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedpassword = await bcrypt.hash(password,10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      username,
      email,
      //password,
      password:encryptedpassword,
    });
    res.send({ status: "ok Successfully Registered" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


app.post("/login-user", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    return res.json({ error: "User Not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const tokenData = {
      email: user.email,
      name: user.name, // Assuming you have a 'name' field in your User model
    };

    const token = jwt.sign(tokenData, JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.json({ status: "ok", data: token });
  }

  return res.json({ status: "error", error: "Invalid Password" });
});
// app.get("/user-profile", (req, res) => {
//   const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the 'Authorization' header

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { email, name } = decoded;
//     // Now you have access to the user's email and name, and you can use them in your profile page
//     return res.json({ email, name });
//   });
// });

app.get('/data', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe');
    const userEmail = decodedToken.email || decodedToken.username; // Depending on your user model

    console.log("Decoded Token:", decodedToken);
    console.log("User Email:", userEmail);

    // Retrieve user data based on the email
    const user = { email: userEmail, }; // You may fetch the actual user data from your database

    console.log("User:", user);

    if (!user.email) {
      return res.status(404).json({ error: 'User not found' });
    }
    const responseUser = { email: user.email, name: user.name };
    return res.json(responseUser);

    return res.json(user);
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
});


 // if (password === user.password) {
  //   const token = jwt.sign({}, JWT_SECRET);
  //   return res.json({ status: "ok login Succesfully", data: token });
  // } else {
  //   return res.json({ status: "error", error: "Password incorrect" });
  // }
  //Compare the entered password with the user's hashed password
app.post("/Rightbar", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const userName = user.username;
    User.findOne({ username: userName })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    const result = await User.deleteOne({ _id: userid });
    if (result.deletedCount === 1) {
      console.log("User deleted successfully");
      res.send({ status: "Ok", data: "Deleted" });
    } else {
      console.log("User not found");
      res.status(404).send({ status: "Error", data: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", data: "Failed to delete user" });
  }
});






router.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save(); // This line saves the category to the database
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 });











// app.post("/post",async(req,res)=>{
//     console.log(req.body);
//     const {name}=req.body;
//     try{
//         if(name=="subhan"){
//             res.send({status:"ok"})
//         }
//     else {
//         res.send({status:"User Not Found"})
//     }
//     }
//     catch(error){
//         res.send({status:"error"})

//     }

// });

// require("./userdetails");

// const User = mongoose.model("UserInfo");
// app.post("/register",async(req,res)=>{
//     const {name, email, mobileNo} = req.body;

//     try{
//         await User.create({
//             name,
//             email,
//             mobileNo,

//         });
//         res.send({status:"ok"});
//     }
//     catch(error){
// res.send({status:"error"});
//     }
// });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const categoryRouter = require('./routes/categoryRoutes');
app.use('/api', categoryRouter);
const productRouter = require('./routes/productRoutes');
app.use('/api', productRouter); // Move this line below the categoryRouter definition
