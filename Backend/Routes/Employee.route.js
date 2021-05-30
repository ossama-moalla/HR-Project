const router=require('express').Router();
const mongoose=require('mongoose');
const Employee = require('../Models/Employee.model');


router.route('/').get((req,res)=>{
    Employee.find()
    .then(employee=>res.json(employee))
    .catch(err=>res.status(400).json('Server-ErrorHandle:'+err));
});
router.route('/add').post((req,res)=>{
    const employee=new Employee;
    employee.EmployeeName=req.body.EmployeeName;
    employee.Gender=req.body.Gender;
    employee.BirthDate=req.body.BirthDate;
    employee.NationalID=req.body.NationalID;
    employee.MaritalStatus=req.body.MaritalStatus;
    employee.Mobile=req.body.Mobile;
    employee.Phone=req.body.Phone;
    employee.Address=req.body.Address;
    employee.Report=req.body.Report;
    employee.EmployeeImage=req.body.EmployeeImage;
    employee.CurrencyID=req.body.CurrencyID;
    
    employee.save()
    .then(()=>{
        res.json('Employee added')})
    .catch(err=>{
        res.status(400).json('SERVER Replay:Add Employee ERROR:'+err);}); 
})
;

router.route('/update').put((req,res)=>{
    Employee.findById(req.body.EmployeeID)
    .then(employee=>{
        
    employee.EmployeeName=req.body.EmployeeName;
    employee.Gender=req.body.Gender;
    employee.BirthDate=req.body.BirthDate;
    employee.NationalID=req.body.NationalID;
    employee.MaritalStatus=req.body.MaritalStatus;
    employee.Mobile=req.body.Mobile;
    employee.Phone=req.body.Phone;
    employee.Address=req.body.Address;
    employee.Report=req.body.Report;
    employee.EmployeeImage=req.body.EmployeeImage;
    employee.CurrencyID=req.body.CurrencyID;
    
    employee.save();
})
.then(()=>res.json('Employee updated'))
.catch(err=>{ res.status(400).json('Update Employee Error:'+err)})
});

router.route('/delete').delete((req,res)=>{
    Employee.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Employee Deleted'))
    .catch(err=>res.status(400).json('Employee Delete Error:'+err));
});

module.exports=router;