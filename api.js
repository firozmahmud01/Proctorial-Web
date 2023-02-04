const express=require('express');
const { getDetailsByFace, getDetailsByID, getReportsByStudentID } = require('./database');
const r=express.Router()
module.exports= r;

r.post('/getdetails',async(req,res)=>{
    
    const {department,batch,id,imgdata}=req.body;
    if((!department||!batch||!id)&&!imgdata){
        res.status(404).json({status:'Need Data'})
        return ;
    }

    if(imgdata){
        let data=(!!imagedata)?await getDetailsByFace(imgdata)

        res.json({status:'OK'})
    }else{
        let data=await getDetailsByID(department,id,batch)
    }

})
r.post('/getreport',async(req,res)=>{
    let {id}=req.id;
    if(!id){
        res.json({status:"Failed to get data."})
        return ;
    }

    let data=await getReportsByStudentID(id);
    if(data){
        res.json({data});
    }else{
        
    }

})