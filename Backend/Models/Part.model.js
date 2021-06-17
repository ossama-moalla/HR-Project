const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PartSchema=new Schema({
    PartName:{
        required:true,
        type:String      
    },
    Description:{
        required:false,
        type:String      
    },
    ParentPartID:{
        type:Schema.Types.ObjectId,
        ref: 'Part',
        required:false
    },  
},{
    timestamps:true
});

const Part=mongoose.model('Part',PartSchema);

module.exports=Part;

