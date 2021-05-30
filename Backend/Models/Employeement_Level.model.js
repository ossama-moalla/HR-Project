const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const EmployeementLevelSchema=new Schema({
    
    LevelName:{
        required:true,
        type:String
    },

},{
    timestamps:true
});

const EmployeementLevel=mongoose.model('EmployeementLevel',EmployeementLevelSchema);
module.exports =EmployeementLevel;
