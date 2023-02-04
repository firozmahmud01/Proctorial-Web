//database name "studentreport"

let crypto = require('crypto');
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user:'firoz',
    password:'password',
    database: "StudentReport"
  });
  

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    con.query("CREATE TABLE IF NOT EXISTS adminuser(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,email TEXT,pass TEXT,isAdmin INTEGER DEFAULT 0,token TEXT NOT NULL);")
    con.query("CREATE TABLE IF NOT EXISTS students(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,studentid TEXT,batch TEXT,department TEXT,number TEXT,fathersname TEXT,mothersname TEXT,mothersnumber TEXT,address TEXT,hsc TEXT,ssc TEXT,email TEXT,img TEXT,faceid TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS reports(uid INTEGER PRIMARY KEY AUTO_INCREMENT,studentid TEXT,dateofreport TEXT,details TEXT);");
  });


async function getData(cmd,arg){
  let p= await new Promise((response,error)=>{
    con.query(cmd,arg, function (err, result, fields) {
      if (err){ error(err); return;}
      response(result);
    });
  })
  return p;
  
}

exports.checktoken=async(token)=>{
  const cmd="SELECT uid,name,email,isAdmin FROM adminuser WHERE token=?;"
  let data=await getData(cmd,[token])
  if(data?.uid){
    return data;
  }else{
    return undefined;
  }
}
exports.createAdminUser=async (name,email,pass)=>{
  let upass=crypto.createHash('sha256').update(pass).digest('base64');
  const cmd="SELECT uid FROM adminuser WHERE email=?;"
  let data=await getData(cmd,[user])
  if(data?.uid){
    return "This email already exists.";
  }else{
    await getData("INSERT INTO adminuser (name, email pass) VALUES ?;",[name,email,upass])
    return "OK"
  }

}
exports.checkauth=async (user,pass)=>{
    let upass=crypto.createHash('sha256').update(pass).digest('base64');
    let salt = crypto.randomBytes(27).toString('hex'); 
    
    const cmd="SELECT uid FROM adminuser WHERE email=? AND pass=?;"
    let data=await getData(cmd,[user,upass])
    if(data?.uid){
      await getData("UPDATE adminuser SET token=? WHERE uid=?;",[salt,data.uid])
      return salt;
    }else{
      return undefined;
    }

}
exports.getDetailsByID=async (department,id,batch)=>{
  const cmd="SELECT * FROM students WHERE department=? AND batch=? AND studentid LIKE %?;"
  let data=await getData(cmd,[department,batch,id])
  if(data?.uid){
    return data;
  }else{
    return undefined;
  }
}
exports.getReportsByStudentID=async (studentid)=>{
  const cmd="SELECT * FROM reports WHERE studentid=?;"
  let data=await getData(cmd,[studentid]);
  if(data?.uid){
    return data;
  }else{
    return undefined;
  }
}
exports.updateFaceData=async(face)=>{
 
}
exports.getDetailsByFace=async (face)=>{

}