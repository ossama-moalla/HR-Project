const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Currency=require('./Currency.model');
const EmployeeSchema=new Schema({
    
    EmployeeName:{
        type:String,
        required:true
    },
    Gender:{
        type:Boolean,
        required:true
    },
    BirthDate:{
        Year:{
            type:Number,
            required:false
        },
        Month:{
            type:Number,
            required:false
        },
        Day:{
            type:Number,
            required:false
        },
        required:false
    },
    NationalID:{
        type:String,
        required:false
    },
    MaritalStatus:{
        type:Number,
        required:true
    },
    Mobile:{
        type:String,
        required:false
    },
    Phone:{
        type:String,
        required:false
    },   
    Email:{
        type:String,
        required:false
    },
    Address:{
        type:String,
        required:false
    },
    Report:{
        type:String,
        required:false
    },
    EmployeeImage:{
        required:false,
        type:String
    },
    CurrencyID:
    {
            type:Schema.Types.ObjectId,
            ref: 'Currency',
            required:false
            
    },
    CertificateList:[{
        Description:String,
        University:String,
        StartYear:String,
        FinishYear:String
    }],
    QualificationList:[{
        Description:String,
        Period:String,
        Notes:String,
    }]
},{
    timestamps:true
});

const Employee=mongoose.model('Employee',EmployeeSchema);

module.exports=Employee;