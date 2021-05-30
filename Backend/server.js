
const express=require('express');
const cors=require('cors');
const mongoose =require('mongoose');

require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());

const EmployeeRouter=require('./Routes/Employee.route')
app.use('/employee',EmployeeRouter);

const database_url=process.env.DataBase_URL;
mongoose.connect(database_url,{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection;
connection.once('open',()=>{
console.log('Database Connection established')});


const port=process.env.port||5000;
app.listen(port,console.log('Server Start listening on port 5000'));