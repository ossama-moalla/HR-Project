const mongoose=require('mongoose');

const schema=mongoose.schema;

const PartSchema=new schema({
    PartName:{
        required:true,
        type:String      
    },
    ParentPartID:{
        type:Schema.Types.ObjectId,
        ref: 'Part',
        required:false
    }, 
    CreateDate:{
        required:true,
        type: Date,
        // The dates of the first and last episodes of
        // Star Trek: The Next Generation
        min: '1-1-2020',
        max: '1-1-2100'
    },
},{
    timestamps:true
});

const Part=mongoose.model('Part',PartSchema);
module.export=Part;

