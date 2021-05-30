const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const CurrencySchema=new Schema({
    CurrencyName:{
        required:true,
        type:String
    },
    CurrencySymbol:{
        required:true,
        type:String,
        maxlength:5
    },
    ReferenceFactor:{
        type:Number,
        required:true
    }
});

const Currency=mongoose.model('Currency',CurrencySchema);
module.exports=Currency;