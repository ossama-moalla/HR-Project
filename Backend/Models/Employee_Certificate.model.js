const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EmployeeCertificateSchema=new Schema({
    EmployeeID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },   
    CertificateDesc:{
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
    CertificateDesc:{
        required:true,
        type:string
    },
},{
    timestamps:true
});

const EmployeeCertificate=mongoose.model('EmployeeCertificate',EmployeeCertificateSchema);
module.exports =EmployeeCertificate;