import React, { Component } from 'react';
import mongoose from 'mongoose';
import { ChevronBarDown  } from 'bootstrap-icons-react';

import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
const Part__=props=>{
    const {part}=props;
    return(
        <div className="row" style={{border:"ridge",margin:15}}>
            <div className="row">
                <div className="col-11" style={{padding:0,margin:0}}>
                    <button className="btn btn-light" style={{textAlign:"left", width:"100%",height:"100%",margin:0,padding:0}}
                     onClick={()=>{props.onClick(props.part._id)}}>{props.part.PartName}</button>  
                </div>
                <div className="col-1">
                    <button id="ShowBasic_Information"className="btn btn-light" 
                    type="button" 
                    data-bs-toggle="collapse" data-bs-target={"#s"+part._id} 
                    aria-expanded="true" 
                    aria-controls={"s"+part._id} >
                        <span>  <ChevronBarDown  /></span>
                    </button>
                </div>        
            </div>
            <div className="collapse " id={"s"+part._id} >
                <div className="card card-body"> 
                    <p>{part.id+"-"+part.Description}<br/>
                    
            <Link to='#' onClick={()=>{props.onClick(part._id)}}>Open</Link>|
            <Link to={{pathname:'/part' ,ExistsPart:{Part:part}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(part._id)}}>Delete</a></p>

                </div>
            </div>
        </div>
    );
}

const Part=props=>{
    return(
    <tr key={props.part._id}>
        <td>
        <img src={process.env.PUBLIC_URL + '/folder_icon.jpg'} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 
        <Link to='#'  style={{textDecoration:"none"}} 
        onClick={()=>{props.onClick(props.part)}}>
            {props.part.PartName}</Link>
        </td>
        <td>{props.part.Description}</td>
        <td>
            <Link to='#' onClick={()=>{props.onClick(props.part)}}>Open</Link>|
            <Link to={{pathname:'/part' ,ParentPart:{Part:props.ParentPart},
            ExistsPart:{Part:props.part}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(props.part._id)}}>Delete</a>
        </td>

    </tr>);
}
const Employeement=props=>{
    return(
    <tr key={props.employeement._id}>
        <td>
        <Link style={{textDecoration:"none"}}  to={{pathname:'/employeement'
         ,state:{employeement:props.employeement}}}>{props.employeement.EmployeementName}</Link>
        </td>
        <td>
            <p>{props.employeement.Tasks}</p>
        </td>
        <td>
            <Link to={{pathname:'/employeement' ,state:{employeement:props.employeement}}}>
                Open</Link>|
            <Link to={{pathname:'/employeement' ,ParentPart:{Part:props.ParentPart},
            ExistsEmployeement:{Employeement:props.employeement}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(props.employeement._id)}}>Delete</a>
        </td>

    </tr>);
}
class PartPath extends Component{
    state={
        PathParts:[]
    }
    componentDidMount(){
        if(this.props.PartID===undefined)
        this.setState({
            PathParts:[]}) ;

        else{
            axios.get('http://localhost:5000/part/get_path/'+this.props.PartID)
            .then(response=>{ 
                this.setState({
                PathParts:response.data}) ;
            })
            .catch(err=>{
                console.log(err)      
            });
        }
        
      }
      
      render(){

          return(
              <React.Fragment>
                  <img src={process.env.PUBLIC_URL + '/home.png'} style={{width:20,height:20,marginTop:-8}}></img>

                <Link to='#' style={{textDecoration:"none",fontWeight:"bold"}} onClick={()=>{this.props.onClick(undefined)}}>ROOT</Link>/

                {
                    
                this.state.PathParts.reverse().map(part=>
                    <React.Fragment key={part._id}>
                        <Link to='#' style={{textDecoration:"none",fontWeight:"bold"}} 
                         onClick={()=>{this.props.onClick(part)}}>{part.PartName}</Link>/
                    </React.Fragment>
                        )
                        }

              </React.Fragment>
              
          )
      }
}
class Parts extends Component {
    constructor(props)
    {
        super(props);

        this.state.CurrentPart=props.location.state.CurrentPart;
    }
    state = {
        CurrentPart:undefined,
        PartsList:[],
        employeementsList:[],

        PathParts:[]
    }
    componentDidMount(){
        this.updateComponents(this.state.CurrentPart)        
                      
    }
       
      updateComponents=async(part)=>{

        let partid=(part===undefined?'':part._id);
        let partslist=[];
        let employeementslist=[];
        axios.get('http://localhost:5000/part/'+partid)
        .then(async( response)=>{ 

                 partslist=response.data;
                 await axios.get('http://localhost:5000/employeement/list/'+partid)
                 .then(res=>{                 
                     employeementslist=res.data;

                    });

                 this.setState({
                     CurrentPart:part,
                    employeementsList:employeementslist,
                    PartsList:partslist}) ; 
                 })
        .catch(err=>{
            let Message='';
            if(err.response)
                Message=err.response.data
            else if(err.request)
                Message='No Response From Server'
            else 
                 Message=err.message
                    
            console.log('Parts-updateComponents:'+Message)})
      }
      deletePart=async(id)=>{
        const r=await axios.delete("http://localhost:5000/part/delete/"+id)
            .then(res=>console.log('part Deleted!'))
            .catch(err=>console.log('part Delete Error:'+err.response.data)); 
            
            this.updateComponents(this.state.CurrentPart);

        
        }
        deleteemployeement=async(id)=>{
            const r=await axios.delete("http://localhost:5000/employeement/delete/"+id)
                .then(res=>console.log('employeement Deleted!'))
                .catch(err=>console.log('employeement Delete Error:'+err.response.data)); 
                
                this.updateComponents(this.state.CurrentPart);

        }
      getPartList(){
        return this.state.PartsList.map(currentpart=>
           {return <Part ParentPart={this.state.CurrentPart} part={currentpart} onDelete={this.deletePart} 
           onClick={this.updateComponents } key={currentpart._id}/>});
  }

      getemployeementList(){ 
            return this.state.employeementsList.map(currentemployeement=>
                {return <Employeement employeement={currentemployeement}onDelete={this.deleteemployeement} 
                onClick={this.updateComponents } key={currentemployeement._id}/>});       
  }
      render() { 
            

        return ( 
                <div className="container">
                    <div className="row" style={{padding:0,backgroundColor:"royalblue"}}>
                        <h1 style={{margin:0,padding:0}}>Current Part:
                        {this.state.CurrentPart===undefined?
                        "Root":this.state.CurrentPart.PartName}</h1>
                    </div>  
                    <div className="row border border-1 rounded"  >
                                <label>Path:</label><br/>
                                <div style={{border:"ridge "}}>
                                    {<PartPath PartID={this.state.CurrentPart===undefined?undefined:this.state.CurrentPart._id} onClick={this.updateComponents }
                                     key={this.state.CurrentPart===undefined?undefined:this.state.CurrentPart._id}/>}
                                </div>
                            
                    </div>
                    <div className="row border border-1 rounded" style={{marginTop:15}} >
                            
                    </div>
                    <div className="row" style={{marginTop:10}}>
                        
                        <div className="col" >
                            <h2>Sub Parts:</h2>
                            <Link to={{pathname:'/part' ,ParentPart:{Part:this.state.CurrentPart}}} style={{marginRight :40}}>
                                Add Part</Link>

                            <table className="table  table-striped " style={{tableLayout:"fixed"}} >
                                <thead>
                                    <tr>
                                    <th style={{width:"50%"}}>Part Name</th>
                                    <th style={{width:"25%"}}> Description</th>
                                    <th style={{width:"25%"}}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.getPartList()}

                                </tbody>
                            </table> 
                        </div>
                       
                        
                        <div className="col">
                            <h2>Employeement in  
                            {this.state.CurrentPart===undefined?
                        " Root":" "+this.state.CurrentPart.PartName}:</h2>
                            <Link to={{pathname:'/employeement' ,ParentPart:{PartID:this.state.CurrentPart}}}>Add Employeement</Link>

                            <table className="table   " style={{tableLayout:"fixed"}} >
                                <thead>
                                    <tr>
                                    <th style={{width:"40%"}}>Employeement Name</th>
                                    <th style={{width:"30%"}}> Task</th>
                                    <th style={{width:"10%"}}> LevelNO</th>

                                    <th style={{width:"20%"}}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getemployeementList()}
                                </tbody>
                            </table> 
                        </div>
                          
                    </div>
                    
                </div>
            
            );
        }
}
 
export default Parts;