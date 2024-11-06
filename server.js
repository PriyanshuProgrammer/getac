const express = require("express");
const jwt = require('jsonwebtoken')
const app = express();
const path = require("path");
const z = require("zod");
const mongoose = require("mongoose");
const pass = "234";

mongoose.connect("mongodb+srv://admin:ElOI40EAnUihKqbR@cluster0.fxyaf.mongodb.net/signuppage")

const User = mongoose.model("Users",{
    name:String,
    email:String,
    password:String,
})

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())

let schema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8)
})

let schema1 = z.object({
    email:z.string().email(),
    password:z.string().min(8)
})

async function userinfoauthentication(req,res,next){
    let userdata = req.body;
    let response = schema.safeParse(userdata);
    if(!response.success){
       return  res.send({
            msg:"Incorrect Data!! Check Email and Password(min 8 characters)",
        })
    }
    const existinguser = await User.findOne({email:userdata.email})
    if(existinguser){
        return res.send({
            msg:"You are Already Signed In"
        })
    }
    const user = new User({
        name:userdata.name,
        email:userdata.email,
        password:userdata.password,
    })
    user.save()
    next();
}

async function usersigninauthentication(req,res,next){
    let usertoken = req.body.token;
    if(usertoken){
        try {
            const response = jwt.verify(usertoken,pass)
            if(response){
                return res.send({
                    msg:"User Signed in succesfully!!!",
                })
        }
        } catch (error) {
            console.log("token error")
        }
    }
    let userdata = req.body;
    let response = schema1.safeParse(userdata);
    if(!response.success){
        return  res.send({
             msg:"Incorrect Data!! Check Email and Password(min 8 characters)",
         })
    }
    const existinguser = await User.findOne({email:userdata.email})
    if(!existinguser){
        return res.send({
            msg:"Your are Not Signed Up!! No details found in the database"
        })
    }
    const passwordcheck = await User.findOne({password:userdata.password})
    if(!passwordcheck){
        
        return res.send({
            msg:"Incorrect Password!!!"
        })
    }
    next();
}

app.post("/signup",userinfoauthentication,function(req,res){
    res.send({
        msg:"User Signed Up succesfully!!!"
    })
})

app.post("/signin",usersigninauthentication,function(req,res){
    let token = jwt.sign({email:req.body.email},pass)
    res.send({
        msg:"User Signed in succesfully!!!",
        token:token,
    })
})

app.listen(3000);