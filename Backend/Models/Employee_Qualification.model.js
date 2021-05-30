const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EmployeeQualificationSchema=new Schema({
    EmployeeID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },   
    QualificationDesc:{
        required:true,
        type:string
    },
    StartDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
   
    EndDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    QualificationDesc:{
        required:true,
        type:string
    },
},{
    timestamps:true
});

const EmployeeQualification=mongoose.model('EmployeeQualification',EmployeeQualificationSchema);
module.exports =EmployeeQualification;