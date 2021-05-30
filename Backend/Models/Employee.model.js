const mongoose=require('mongoose');
const Schyema=mongoose.Schema;
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
        type:String,
        required:true
    },
    NationalID:{
        type:String,
        required:true
    },
    MaritalStatus:{
        type:Number,
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Report:{
        type:String,
        required:true
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
            
    }
},{
    timestamps:true
});

const Employee=mongoose.model('Employee',EmployeeSchema);

module.exports=Employee;