const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Part=require('./Part.model')
const EmployeementLevel=require('./Employeement_Level.model')


const EmployeementSchema=new Schema({
    
    EmployeementName:{
        required:true,
        type:String
    },
    Tasks:{
        required:true,
        type:String
    },
    LevelNO:{
        required:true,
        type:Number
    },
    PartID:{
        type:Schema.Types.ObjectId,
        ref: 'Part',
        required:false
    },

},{
    timestamps:true
});

const Employeement=mongoose.model('Employeement',EmployeementSchema);
module.exports =Employeement;
