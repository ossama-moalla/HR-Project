const router=require('express').Router();
const mongoose=require('mongoose');
const Employeement=require('./../Models/Employeement.model')

router.route('/list/:partid').get((req,res)=>{
    Employeement.find({PartID:req.params.partid})
    .then(employeements=>{
        res.json(employeements);
    })
    .catch(err=>{
        console.log('get employeement list:'+err);
        res.state(400).json('get employeement list:'+err)
    })
});

router.route('/list/').get((req,res)=>{
    Employeement.find({PartID:null})
    .then(employeements=>{    

        res.json(employeements);
    })
    .catch(err=>{
        console.log('get employeement list:'+err);
        res.state(400).json('get employeement list:'+err)
    })
});
router.route('/add/').post((req,res)=>{
    const EmployeementName=req.body.EmployeementName;
    const Tasks=req.body.Tasks;
    const LevelNO=req.body.LevelNO;


    const PartID=req.body.PartID;
    const employeement=new Employeement({EmployeementName,Tasks,LevelNO,PartID});
    employeement.save()
    .then(()=>res.json('employeement added'))
    .catch(err=>{console.log('SERVER Replay:Add employeement ERROR:'+err)
        res.status(400).json('SERVER Replay:Add employeement ERROR:'+err);});

});

router.route('/update/').put((req,res)=>{
Employeement.findById(req.body.EmployeementID)
.then(employeement=>{
    employeement.EmployeementName=req.body.EmployeementName;
    employeement.Tasks=req.body.Tasks;
    employeement.LevelNO=req.body.LevelNO;

    employeement.PartID=req.body.PartID;
    employeement.save()
    .then(()=>res.json('employeement updated'))
    .catch(err=>res.status(400).json('Update Employeement Error:'+err))
})

})

router.route('/delete/:id').delete(async(req,res)=>{
try{
     
        await Employeement.findByIdAndDelete(req.params.id)
        res.json('Employeement Deleted') 
    }
catch(err)
{
    console.log('Employeement Delete Error:'+err)
    res.status(400).json('Employeement Delete Error:'+err)
}
})
module.exports=router;