const mongoose = require('mongoose');

const connectDatabase = () =>{
     mongoose.connect(process.env.Db-urlencoded,{
    
     }).then(()=>{
        console.log("connected to database succesfully")
     })
     .catch(()=>{
       console.log("it is not connected to database") 
     })
}