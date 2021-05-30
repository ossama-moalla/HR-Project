const mongoose=require('mongoose');
const Schema=mongoose.Schema;



const DocumentSchema=new Schema({
    DocumentDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    EmployeeID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },
    DocumentType:{
        required:true,
        type:Number
    },
    ExecuteDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    TargetDocumentID:{
        type:Schema.Types.ObjectId,
        ref: 'Document',
        required:false
    },
    EmployeementID:{
        
        type:Schema.Types.ObjectId,
        ref: 'Employeement',
        required:false
    },
    Notes:{
        type:String,
        required:false
    }

},{
    timestamps:true
});

const Document=mongoose.model('Document',DocumentSchema);
module.exports =Document;