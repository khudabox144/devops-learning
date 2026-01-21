import express from 'express';
import cors from 'cors';
import  jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const app=express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User Schema
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
});

const User=mongoose.model('User',userSchema);

// Register endpoint
app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({username,password:hashedPassword});
    await newUser.save();
    res.status(201).send('User registered');
});

// Login endpoint
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user){
        return res.status(400).send('Invalid credentials');
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).send('Invalid credentials');
    }
    const token=jwt.sign({id:user._id},'sakib_is_my_secret_key',{expiresIn:'1h'});
    res.json({token});
});

// Profile endpoint
app.get('/profile',async(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    try{
        const decoded=jwt.verify(token,'sakib_is_my_secret_key');
        const user=await User.findById(decoded.id);
        res.json(user);
    }catch(err){
        res.status(401).send('Invalid token');
    }
});    

app.listen(3000,()=>{
    console.log('User service running on port 3000');
});