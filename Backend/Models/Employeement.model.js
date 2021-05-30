const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Part=require('./Part.model')
const EmployeementLevel=require('./Employeement_Level.model')


const EmployeementSchema=new Schema({
    
    EmployeementName:{
        required:true,
        type:String
    },
    LevelID:{
        type:Schema.Types.ObjectId,
        ref: 'EmployeementLevel',
        required:true
    },
    CreateDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    PartID:{
        type:Schema.Types.ObjectId,
        ref: 'Part',
        required:true
    },

},{
    timestamps:true
});

const Employeement=mongoose.model('Employeement',EmployeementSchema);
module.exports =Employeement;
