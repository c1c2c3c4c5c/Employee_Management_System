import express from "express";
import AdminRouter from "../src/routes/admin.routes.js";
import EmployeeRouter from "../src/routes/employee.routes.js";
import { connectusingMongoose } from "./src/config/mongodb.js";


const server=express();

server.use(express.json());

server.use('/api/admin',AdminRouter);
server.use('/api/employee',EmployeeRouter);

server.get('/',(req,res)=>{
    res.send("welcome to employee mgmt page api");
});

server.use((req,res)=>{
    res.send("API not found ")
});



server.listen(5003,()=>{
    console.log("server is listening on 5003");
    connectusingMongoose();
    
})