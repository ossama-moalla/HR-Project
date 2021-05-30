const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EmployeeSalaryClauseSchema=new Schema({
    EmployeeID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },  
    SalaryClauseID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
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
    SalaryClauseDesc:{
        required:true,
        type:String
    },
    ClauseType:{
        type:Number,
        required:true
    },
    ExecuteDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    MonthCount:{
        type:Number,
        required:false
    },
    ClauseValue:{
        type:Number,
        required:true
    },
    Notes:{
        type:String,
        required:false
    },
},{
    timestamps:true
});

const EmployeeSalaryClause=mongoose.model('EmployeeSalaryClause',EmployeeSalaryClauseSchema);
module.exports =EmployeeSalaryClause;