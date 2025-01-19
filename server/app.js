const express =require("express");
const app=express();
const PORT=7895
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const connectToDB=require("./db/db");
const cookieParser=require("cookie-parser");
const { auth } = require('express-openid-connect');
const fs=require("fs");
const path = require("path");
const asyncHandler = require('express-async-handler');

const User  = require("./models/userModel");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.client_id,
  issuerBaseURL: process.env.issuer_Base_Url,
  routes:{
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  }
};
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended :true}));
app.use(auth(config));

//function to check  if user exists in db
const ensureUserinDB=asyncHandler(async(user)=>{
    try {
        const exists=await User.findOne({auth0Id: user.sub});
        if(!exists){
            //create a newUseer
            const newUser=new User({
                auth0Id:user.sub,
                email:user.email,
                name:user.name,
                role:"jobseeker",
                profilePicture:user.picture,
            })
            await newUser.save();
            console.log("User created in db",user);
        }
        else{
            console.log("User already exists in db ",exists);
        }
    } catch (error) {
        console.log("Error chekcing user in db due to "+error.message);
    }
})
 
app.get('/', async (req, res) => {
    if (req.oidc.isAuthenticated()) {
      try {
        console.log("Hi Lok");
        await ensureUserinDB(req.oidc.user);
        return res.redirect(process.env.CLIENT_URL);  // Redirect after ensuring the user is in the DB
      } catch (error) {
        console.error("Error ensuring user in DB:", error);
        return res.status(500).send("Internal Server Error");
      }
    } else {
      return res.status(401).send("User Not Logged in");  // If the user is not authenticated
    }
  });
  
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}));

//routes
const routeFiles = fs.readdirSync("./routes"); // List all files in the 'routes' directory
routeFiles.forEach((file) => {
    if (path.extname(file) === ".js") { // Ensure it's a JavaScript file
      const route = require(`./routes/${file}`); // Use require to load route
      app.use("/api", route); // Add the route to the Express app with '/api' prefix
    }
  });

/*
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
*/


connectToDB();
app.listen(PORT , ()=> console.log("App is running on "+PORT));