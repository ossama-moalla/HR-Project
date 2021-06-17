import React, { Component } from 'react';
import * as moment from 'moment'
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
const EmployeeRow=props=>{
    function getMartialStatus(){
        switch(props.employee.MaritalStatus) {
            case 1:
              return 'Single';
            case 2:
              return 'Married';
            case 3:
              return 'Divorced';
            case 4:
              return 'Widower';

            default:
              return 'Error';
          }

    }
    function getContact(){
        var contact=[];
        if(props.employee.Mobile)
            contact.push("Mob:"+props.employee.Mobile);
        if(props.employee.Phone)
            contact.push("Phone:"+props.employee.Phone);
        if(props.employee.Mobile)
            contact.push("Email:"+props.employee.Email);
         
         return(
             <p>
                {   
                contact.map(c=>c +'\n')}    
              
             </p>
         )   
    }
    const tdstyle = 
    {overflow:"hidden",whiteSpace:"unset",textOverflow:"ellipsis",overflowWrap:"break-word"
      };
    return(
    <tr key={props.employee._id}>
        <td>
            <Link style={{textDecoration:"none"}}  to={{pathname:'/employee' ,state:{employee:props.employee}}}>
            <img src={props.employee.EmployeeImage===undefined?process.env.PUBLIC_URL + '/employee.jpg':
            props.employee.EmployeeImage} style={{width:75,height:75,marginTop:-8,marginRight:5}} /> 
            </Link>
        </td>
        <td
        style={tdstyle}>
            <Link style={{textDecoration:"none"}}  to={{pathname:'/employee' ,state:{employee:props.employee}}}>
                {props.employee.EmployeeName}
            </Link>
        </td>
        <td><p>{props.employee. Gender===true?"Male":"Female"}</p></td>
        <td><p> {props.employee.BirthDate.Day+'-'+props.employee.BirthDate.Month+'-'+
            props.employee.BirthDate.Year}</p></td>
        <td><p>{getMartialStatus()}</p></td>
        <td style={tdstyle}>{getContact()}</td>
        <td style={tdstyle}><p>{props.employee.Address}</p></td>      
        <td>
            <Link to={{pathname:'/employee' ,state:{employee:props.employee}}}>Open</Link>|
            <Link to={{pathname:'/editemployee' ,state:{employee:props.employee}}}>Edit</Link>|
            <a href="" onClick={()=>{props.onDelete(props.employee._id)}}>Delete</a>
        </td>

    </tr>);
}

class Employees extends Component {
    constructor(props)
    {
        super(props);
    }
    state = {
        EmployeeList:[],
      }
      componentDidMount(){               
                this.updateComponents();
      }
       
      updateComponents=async()=>{
          
            let employeelist=[];

             await axios.get('http://localhost:5000/employee/list')
             .then(response=>{ 
                         employeelist=response.data;
                     })
                    .catch(err=>{
                        console.log('updateComponents Error:'+err);
                        //this.props.history.push("/Error/"+err.response.data);
                    });
                    this.setState({
                        EmployeeList:employeelist}) ;

       
      }
      deleteEmployee=async(id)=>{
        const r=await axios.delete("http://localhost:5000/employee/delete/"+id)
            .then(res=>console.log('Employee Deleted!'))
            .catch(err=>console.log('Employee Delete Error:'+err.response.data)); 
            
            this.updateComponents();

        
        }
        
      getEmployeeList(){
        return this.state.EmployeeList.map(currentEmployee=>
           {return <EmployeeRow employee={currentEmployee}onDelete={this.deleteEmployee} 
           onClick={this.updateComponents } key={currentEmployee._id}/>});
        }

      render() { 
            

        return ( 
                <div style={{backgroundColor:""}}>
                    
                    <h1>Employees:</h1>

                    <Link to={{pathname:'/addemployee' ,state:{employee:undefined}}} style={{marginRight :40}}>Add Employee</Link>
                    
                    <table className="table table-success table-striped " style={{tableLayout:"fixed"}} >
                        <thead>
                            <tr>
                            <th style={{width:75}}>Image </th>

                            <th style={{width:200}}>EmployeeName</th>
                            <th style={{width:100}}> Gender</th>
                            <th style={{width:100}}> BirthDate</th>
                            <th style={{width:125}}>MaritalStatus</th>
                            <th style={{width:125,whiteSpace:"unset",overflowWrap:"break-word"}}>Contact</th>
                            <th style={{width:125}}>Address</th>
                                <th style={{width:150}}></th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getEmployeeList()}
                        </tbody>
                    </table>
                </div>
            
            );
        }
}
 
export default Employees;