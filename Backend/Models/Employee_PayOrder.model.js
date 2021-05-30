const mongoose=require('mongoose');
const Schema=mongoose.Schema;
   
const EmployeePayOrderSchema=new Schema({
    PayOrderDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
    SalaryPayOrderID:{
        type:Schema.Types.ObjectId,
        ref: 'SalaryPayOrder',
        required:false
    },
    EmployeeID:{
        type:Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    }, 
    CurrencyID:{
        type:Schema.Types.ObjectId,
        ref: 'Currency',
        required:false
    },   
    ExchangeRate:{
        required:true,
        type:Number
    },
    PayOrderValue:{
        required:true,
        type:Number
    },
},{
    timestamps:true
});

const EmployeePayOrder=mongoose.model('EmployeePayOrder',EmployeePayOrderSchema);
module.exports =EmployeePayOrder;