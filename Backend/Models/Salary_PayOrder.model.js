const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const SalaryPayOrderSchema=new Schema({
    OrderDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    ExecuteYear:{
        type:number,
        required:true,
        max:2100,
        min:2020
    },
    ExecuteMonth:{
        type:number,
        required:true,
        max:12,
        min:1
    },
    Notes:{
        required:true,
        type:String
    },
},{
    timestamps:true
});

const SalaryPayOrder=mongoose.model('SalaryPayOrder',SalaryPayOrderSchema);
module.exports =SalaryPayOrder;