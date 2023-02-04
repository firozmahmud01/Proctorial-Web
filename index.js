
const express=require('express');
const { checkauth } = require('./database');
const AllApi =require('./api')
const app=express();
app.use(express.json())
app.use(express.urlencoded());


let crypto = require('crypto'); 

    console.log(salt)



const middlecheck=(req,res,next)=>{
    
    
    
    if(x==valide){
    next();
    }else{
    res.status(404).send("failed to proccess")
    }
    
    }



app.use('/api',middlecheck,AllApi);
app.listen(80);

app.post("/login",async(req,res)=>{
    let {user,pass}=req.body
    if(!user||!pass){
        res.json({status:"Something is missing"});
        return;
    }
    let data=await checkauth(user,pass);
    if(data==undefined){

        res.json({status:'Wrong username or password.'});

    }else{
        res.json({status:'OK',cookie:data});
    }
})