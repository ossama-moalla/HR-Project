const router=require('express').Router();
const mongoose = require('mongoose');
const Part=require('./../Models/Part.model');

router.route('/').get((req,res)=>{
    Part.find({ParentPartID:null})
    .then(part=>res.json(part))
    .catch(err=>{nm.b.ljk
        res.status(400).json('Sever-Error:'+err)});
 
});
router.route('/:id').get((req,res)=>{

    const doesPartExit =  Part.exists({ _id: req.params.id });

    if(doesPartExit)
    {
        Part.find({ParentPartID:req.params.id})
        .then(Part=>res.json(Part))
        .catch(err=>res.status(400).json('Error:'+err));

    }else{
        res.status(400).json('Part Not Found');
    }
    });

router.route('/get_path/:id').get(async(req,res)=>{
    let PathParts=[];
    let id={value:req.params.id};
    if(mongoose.Types.ObjectId.isValid(id.value))
    {
        function getdata(iid){
            return  Part.findById(iid)        
        ;
        }
        do{
            let data=await getdata(id.value);
            PathParts.push(data);
            id.value=data.ParentPartID;
        
        }while(mongoose.Types.ObjectId.isValid(id.value));
        res.json(PathParts);
    }
        
    });
router.route('/add/').post((req,res)=>{
        const PartName=req.body.PartName;
        const Description=req.body.Description;
    
        const ParentPartID=mongoose.Types.ObjectId.isValid(req.body.ParentPartID)? req.body.ParentPartID:null;
        const part=new Part({PartName,Description,ParentPartID});
        part.save()
        .then(()=>res.json('part added'))
        .catch(err=>{
            res.status(400).json('SERVER Replay:Add Part ERROR:'+err);});
    
    
   
});

router.route('/update/').put((req,res)=>{
    Part.findById(req.body.PartID)
    .then(part=>{
        part.PartName=req.body.PartName;
        part.Description=req.body.Description;
        part.ParentPartID=req.body.ParentPartID;
        part.save()
        .then(()=>res.json('part updated'))
        .catch(err=>res.status(400).json('Update Part Error:'+err))
    })
   
})
  
router.route('/delete/:id').delete(async(req,res)=>{
    try{
         h=async (idd)=>{
            await Part.find({ParentPartID:idd})
            .then(async( parts)=>{
                if(parts.length>0) {
                    for(var i=0;i<parts.length;i++)
                    {
                        await h(parts[i]._id) 
                    }
                }
            });
            await Part.findByIdAndDelete(idd)

        }

        await h(req.params.id)
        res.json('Part Deleted') 
    }catch(err)
    {
        console.log('Part Delete Error:'+err)
        res.status(400).json('Part Delete Error:'+err)
    }
})

module.exports=router;